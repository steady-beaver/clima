import { gsap } from 'gsap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import def_img from '../utils/def_house_img.jpg';
import styles from './Bar.module.css';


class Bar extends Component {

    state = {
        WEATHER_API_KEY: "ccec765bf7b5d7e644d77172a0eadb7c",
        IMAGES_API_KEY: "Cs5VM9ECaEgKddglzuvOxLIDx5rL86aanVD9VhtDY-4",
        GEO_API_KEY: "2554eb196ece4fea83c4ccc5875aa8e8"
    }

    sunElement = null;
    rotationTween = null;

    helperEl = null;


    handleCityChange = (e) => {
        const elementSubmitButton = document.querySelector('form button')

        if (e.target.value) {
            elementSubmitButton.disabled = false
        }
        else elementSubmitButton.disabled = true
    }

    unifyImg = (img_url) => {
        img_url = img_url.replace('&w=400', '&w=300&h=200')
        img_url = img_url.replace('&fit=max', '&fit=crop')
        return img_url
    }

    fromUnixToStr = (unix_timestamp) => {
        let date = new Date(unix_timestamp * 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let seconds = "0" + date.getSeconds();
        let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        return formattedTime;
    }

    formatData = (arr) => {
        for (let i in arr) {
            arr[i].Hour = arr[i].Hour.split(":")[0]
        }
    }

    validation = (city) => {

        const WD = this.props.weatherData
        if (WD.length > 0) {
            WD.forEach(
                entry => {
                    console.log(entry.place.city === city)
                    if (entry.place.city === city) {
                        this.helperEl.innerHTML = "You already have data for that city."
                        throw new Error("You already have data for that city! (Client input error)")
                    }
                }
            )
        }

    }

    getDateFromUNIX = (unix) => {
        const milliseconds = unix * 1000;

        const dateObject = new Date(milliseconds);

        const humanDateTimeFormat = dateObject.toLocaleString('en-GB'); //2019/12/9 10:30:15

        const humanDateFormat = humanDateTimeFormat.split(',')[0];

        return humanDateFormat.replace(/\//g, "-");

        ;
    }

    isDayLight = (currentDayData) => {
        // const currentTime = 1601377777;   //TEST

        const currentTime = currentDayData.dt;
        const sunrise = currentDayData.sunrise;
        const sunset = currentDayData.sunset;

        if (sunrise < currentTime && currentTime < sunset) return true;
        else return false;

    }

    // data = [
    //     {
    //         "date": "formatted date 1",
    //         "average temperature": 32
    //     },
    // ]

    refine(daysArr) {

        const calculateAvgTemp = (dayTempData) => {
            const avgTemp = Math.round((dayTempData.morn + dayTempData.day + dayTempData.eve + dayTempData.night) / 4);
            return avgTemp;
        }


        let data = daysArr.map(dayData => {
            return {
                "date": this.getDateFromUNIX(dayData.dt),
                "avr": calculateAvgTemp(dayData.temp)
            }
        })

        data.shift();
        return data;
    }

    handleSubmit = async (e) => {

        try {

            e.preventDefault();
            let city = e.target["city"].value.trim();
            city = city[0].toUpperCase() + city.substring(1)
            this.validation(city)

            e.target["city"].value = ""
            e.target.children[1].disabled = true


            let resGeoCoordinates = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=${this.state.GEO_API_KEY}&q=${city}&no_annotations=1&limit=1`)
            resGeoCoordinates = await resGeoCoordinates.json()
            const category = resGeoCoordinates.results[0].components._category
            const type = resGeoCoordinates.results[0].components._type

            if (category !== "place" || type !== "city") {
                throw new Error("OpenCage Geocoding API cannot find such city!")
            }

            let coords = {
                lat: resGeoCoordinates.results[0].geometry.lat,
                lng: resGeoCoordinates.results[0].geometry.lng
            }



            let resWeather = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lng}&exclude=minutely&appid=${this.state.WEATHER_API_KEY}&units=metric`)

            if (!resWeather.ok) {
                throw new Error("Problem with Open Weather API")
            }


            resWeather = await resWeather.json()


            let hourTempArr = [];
            
            console.log("RESult Weather Object")
            console.log(resWeather)

            for (let i in resWeather.hourly) {
                let date = this.fromUnixToStr(resWeather.hourly[i].dt)
                hourTempArr.push({
                    Hour: date,
                    Temperature: resWeather.hourly[i].temp
                })
                if (date === "0:00:00") break;
            }

            this.formatData(hourTempArr)


            let resImages = await fetch(`https://api.unsplash.com/search/photos?client_id=${this.state.IMAGES_API_KEY}&page=1&per_page=3&query=${city}`)
            resImages = await resImages.json()

            let unified_img_url = "";
            let alt = "";


            if (resImages.total === 0) {
                unified_img_url = def_img
                //"https://www.developco.com/wp-content/uploads/2015/08/CCCC-home-2-500x200.jpg"
                alt = "Unfortunately Unsplash API does not provide images for that town."
            } else {
                unified_img_url = this.unifyImg(resImages.results[2].urls.small)
                alt = resImages.results[2].alt_description
            }

            //====================   Weather Object   ========================

            let weatherObj = {
                place: {
                    city: city,
                    lat: coords.lat,
                    lng: coords.lng
                },
                image: {
                    img_url: unified_img_url,
                    alt: alt
                },
                current: {
                    temp: resWeather.current.temp,
                    sky: resWeather.current.weather[0].main,
                    skyID: resWeather.current.weather[0].id,
                    desc: resWeather.current.weather[0].description,
                    dayLight: this.isDayLight(resWeather.current)
                },
                daily: {
                    tempHourArr: hourTempArr
                },
                forecast: this.refine(resWeather.daily)
            }

            this.props.onAddForecast(weatherObj);
            this.helperEl.innerHTML = "";
            this.rotationTween.restart();

        } catch (e) {

            this.helperEl.innerHTML = e.message;

            console.error(e.name + ' caught! \n' + e);
        }

    }

    componentDidMount() {
        this.helperEl = document.getElementById("helper-text");
        this.rotationTween = gsap.to(this.sunElement, { duration: 1.5, rotation: 360 });
    }


    render() {

        return (
            <div className={styles.Bar}>
                <h1>Clima</h1>
                <div className={styles.Sun} ref={div => this.sunElement = div} >
                    <img src="imgs/sun/stylized-sun-bg.png" alt="sun" />
                </div>   
                <form className={styles.Form} onSubmit={this.handleSubmit}>
                    <input type="text" spellCheck="false" id="city" name="city" placeholder="City" onChange={this.handleCityChange} />
                    <span className="helper-text left-align red-text" id="helper-text" ></span>
                    <button className="waves-effect   btn teal lighten-2" disabled={true} type="submit">Get forecast</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        weatherData: state.weatherReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddForecast: (weatherObj) => dispatch(actions.GET_CITY_WEATHER(weatherObj))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Bar)
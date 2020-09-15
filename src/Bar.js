import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions/actions';
import styles from './Bar.module.css';
import def_img from './utils/def_image_500x200.jpg';


class Bar extends Component {

    state = {
        WEATHER_API_KEY: "ccec765bf7b5d7e644d77172a0eadb7c",
        IMAGES_API_KEY: "Cs5VM9ECaEgKddglzuvOxLIDx5rL86aanVD9VhtDY-4",
        GEO_API_KEY: "2554eb196ece4fea83c4ccc5875aa8e8"
    }


    handleCityChange = (e) => {
        const elementSubmitButton = document.querySelector('form button')

        if (e.target.value) {
            elementSubmitButton.disabled = false
        }
        else elementSubmitButton.disabled = true
    }

    unifyImg = (img_url) => {
        img_url = img_url.replace('&w=400', '&w=500&h=200')
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

    handleSubmit = async (e) => {

        const helperEl = document.getElementById('helper-text')

        try {

            e.preventDefault();
            let city = e.target["city"].value;
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
            console.log("resWeather")
            console.log(resWeather.status)
            if (!resWeather.ok) {
                throw new Error("Problem with Open Weather API")
            }


            resWeather = await resWeather.json()
            console.log(resWeather)

            let dayTempArr = [];

            for (let i in resWeather.hourly){
                let formattedDate = this.fromUnixToStr(resWeather.hourly[i].dt)
                dayTempArr.push({
                    x: formattedDate,
                    y: resWeather.hourly[i].temp
                })
                if (formattedDate === "0:00:00") break;
            }

            

            console.log("dayTempArr: ")
            console.log(dayTempArr)


            let resImages = await fetch(`https://api.unsplash.com/search/photos?client_id=${this.state.IMAGES_API_KEY}&page=1&per_page=3&query=${city}`)
            resImages = await resImages.json()

            let unified_img_url = "";
            let alt = "";


            if (resImages.total == 0) {
                unified_img_url = def_img
                //"https://www.developco.com/wp-content/uploads/2015/08/CCCC-home-2-500x200.jpg"
                alt = "Unfortunately Unsplash API does not provide images for that town."
            } else {
                unified_img_url = this.unifyImg(resImages.results[2].urls.small)
                alt = resImages.results[2].alt_description
            }

            //console.log("resImages")
            //console.log(resImages)





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
                    sky: resWeather.current.weather[0].main
                },
                daily:{
                    tempHourArr: dayTempArr
                },
                forecast: null
            }

            this.props.onAddForecast(weatherObj);
            helperEl.innerHTML = "";

        } catch (e) {

            helperEl.innerHTML = e.message;

            console.error(e.name + ' caught!');
        }

    }

    render() {

        const myStyle = { margin: '20px 0 0 0' }

        return (
            <div>
                <form className={styles.BarForm} onSubmit={this.handleSubmit}>
                    <div className='row'>
                        <div className="input-field inline col s6 offset-s3">
                            <input style={myStyle} type="text" id="city" name="city" placeholder="City" onChange={this.handleCityChange} />
                            <span className="helper-text left-align red-text" id="helper-text"></span>
                        </div>
                    </div>
                    <button className="waves-effect waves-light btn teal lighten-2" disabled={true} type="submit">Get forecast</button>
                </form>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onAddForecast: (weatherObj) => dispatch(actions.GET_CITY_WEATHER(weatherObj))
    }
}



export default connect(null, mapDispatchToProps)(Bar)
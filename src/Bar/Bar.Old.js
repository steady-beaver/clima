import { gsap } from 'gsap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/actionCreators';
import makeCustomRequests from '../utils/makeCustomRequests';
import simpleFuncs from '../utils/simpleFunctions';
import styles from './Bar.module.css';


class Bar extends Component {

    
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

    

    handleSubmit = async (e) => {

        try {
            //===================   Form process    =======================
            e.preventDefault();
            let city = e.target["city"].value.trim();
            city = city[0].toUpperCase() + city.substring(1)
            this.validation(city)

            e.target["city"].value = ""
            e.target.children[1].disabled = true

            //====================    Get wanted data   ====================

            this.props.onRequestSend();

            const coords = await makeCustomRequests.getCityCoordinates(city)

            const [resWeather, hourTempArr] = await makeCustomRequests.getWeatherData(coords)

            const [unified_img_url, alt] = await makeCustomRequests.getCityImage(city);

            //====================    Sun animation   ====================

            
            this.rotationTween.restart();

            //====================  Compose Weather Object   ========================
            
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
                    dayLight: simpleFuncs.isDayLight(resWeather.current)
                },
                daily: {
                    tempHourArr: hourTempArr
                },
                forecast: simpleFuncs.refineData(resWeather.daily)
            }
            
            
            this.props.onAddForecast(weatherObj);
            this.helperEl.innerHTML = "";
            this.props.onResponseReceived();

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
        weatherData: state.weatherReducer.weatherArr
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddForecast: (weatherObj) => dispatch(actions.GET_CITY_WEATHER(weatherObj)),
        onRequestSend: () => dispatch(actions.WAIT_LOADING()),
        onResponseReceived: () => dispatch(actions.RESPONSE_RECEIVED())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Bar)
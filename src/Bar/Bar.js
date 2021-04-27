import React, { useState } from 'react';
import { WeatherContext } from '../App';
import makeCustomRequests from '../utils/makeCustomRequests';
import simpleFuncs from '../utils/simpleFunctions';
import styles from './Bar.module.css';


// TODO validation of the input !

const Bar = ({ addForecastAct, setLoadingTrueAct }) => {

    const weatherData = React.useContext(WeatherContext)
    const [error, setError] = useState("")
    const [animationCLass, setAnimationClass] = useState(null)
    const [city, setCity] = useState(true)

    const animate = () => {
        setAnimationClass(styles.SunAnimation)

        setTimeout(() => {
            setAnimationClass("")
        }, 2500)
    }

    const validateCityInp = (cityVal) => {

        const pattern = new RegExp(/^([A-Z]+[ ]?)*$/, "i")
        const isPassed = pattern.test(cityVal)
        return isPassed
    }


    const handleCityChange = (e) => {
        setError("")
        if(e.target.value === "") return
        let cityInpVal = e.target.value.trim()
        cityInpVal = cityInpVal[0].toUpperCase() + cityInpVal.slice(1)  //Capitalize 

        cityDuplicationCheck()

        if (validateCityInp(cityInpVal)) {
            setCity(cityInpVal)
        }
        else {
            setError("Invalid city")
        }

        cityDuplicationCheck(cityInpVal)
    }

    const cityDuplicationCheck = (city) => {
        if (weatherData.length > 0) {
            weatherData.forEach(entry => {
                if (entry.place.city === city) setError("City duplication.")
            }
            )
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let weatherData;
        let hourTempArr;
        let unified_img_url;
        let alt;
        let coords;

        setLoadingTrueAct();


        // API requests
        try {
            coords = await makeCustomRequests.getCityCoordinates(city);
            [weatherData, hourTempArr] = await makeCustomRequests.getWeatherData(coords);
            [unified_img_url, alt] = await makeCustomRequests.getCityImage(city);

        } catch (e) {
            setError(e.message)
            console.error("Problem with AJAX requests")
            console.error(e)
            addForecastAct(null);
            return
        }


        animate()       //sun animation

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
                temp: weatherData.current.temp,
                sky: weatherData.current.weather[0].main,
                skyID: weatherData.current.weather[0].id,
                desc: weatherData.current.weather[0].description,
                dayLight: simpleFuncs.isDayLight(weatherData.current)
            },
            daily: {
                tempHourArr: hourTempArr
            },
            forecast: simpleFuncs.refineData(weatherData.daily)
        }

        addForecastAct(weatherObj);
    }

    return (
        <div className={styles.Bar}>
            <h1>Clima</h1>
            <div className={`${styles.Sun} ${animationCLass}`}  >
                <img src="imgs/sun/stylized-sun-bg.png" alt="sun" />
            </div>
            <form className={styles.Form + " row"} onSubmit={handleSubmit} >

                <input type="text"
                    className="col s9"
                    spellCheck="false"
                    placeholder="Country"
                />
                <input type="text"
                    className="col s2 offset-s1"
                    spellCheck="false"
                    placeholder="Code"
                />

                <input type="text"
                    className="col s12"
                    spellCheck="false"
                    placeholder="City"
                    onChange={handleCityChange} />
                <span className="helper-text left-align red-text"  >{error}</span>
                <button className="waves-effect   btn teal lighten-2" disabled={error || !city} type="submit">Get forecast</button>
            </form>
        </div>
    )
}

export default Bar

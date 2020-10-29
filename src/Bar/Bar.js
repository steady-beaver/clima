
import React, { useContext, useEffect, useState } from 'react';
import { WeatherContext } from '../App';
import makeCustomRequests from '../utils/makeCustomRequests';
import simpleFuncs from '../utils/simpleFunctions';
import styles from './Bar.module.css';


const Bar = ({ onAddForecast, onRequestSend, onResponseReceived }) => {

    let helperEl = null;

    const weatherData = useContext(WeatherContext)
    const [animationCLass, setAnimationClass] = useState(null)

    const animate = () => {
        setAnimationClass(styles.SunAnimation)

        setTimeout(() => {
            setAnimationClass("")
        }, 2500)
    }

    // useEffect(() => {
    //     animate()
    // }, [])

    useEffect(() => {
        helperEl = document.getElementById("helper-text");
    })

    const handleCityChange = (e) => {
        const elementSubmitButton = document.querySelector('form button')

        if (e.target.value) {
            elementSubmitButton.disabled = false
        }
        else elementSubmitButton.disabled = true
    }

    const validation = (city) => {

        const WD = weatherData
        if (WD.length > 0) {
            WD.forEach(
                entry => {
                    console.log(entry.place.city === city)
                    if (entry.place.city === city) {
                        helperEl.innerHTML = "You already have data for that city."
                        throw new Error("You already have data for that city! (Client input error)")
                    }
                }
            )
        }
    }

    const handleSubmit = async (e) => {

        try {
            //===================   Form process    =======================
            e.preventDefault();
            let city = e.target["city"].value.trim();
            city = city[0].toUpperCase() + city.substring(1)
            validation(city)

            e.target["city"].value = ""
            e.target.children[1].disabled = true

            //====================    Get wanted data   ====================

            onRequestSend();

            const coords = await makeCustomRequests.getCityCoordinates(city)

            const [resWeather, hourTempArr] = await makeCustomRequests.getWeatherData(coords)

            const [unified_img_url, alt] = await makeCustomRequests.getCityImage(city);

            //====================    Sun animation   ====================

            animate()
            // rotationTween.restart();

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


            onAddForecast(weatherObj);
            helperEl.innerHTML = "";
            onResponseReceived();

        } catch (e) {

            helperEl.innerHTML = e.message;

            console.error(e.name + ' caught! \n' + e);
        }

    }

    return (
        <div className={styles.Bar}>
            <h1>Clima</h1>
            <div className={`${styles.Sun} ${animationCLass}`}  >
                <img src="imgs/sun/stylized-sun-bg.png" alt="sun" />
            </div>
            <form className={styles.Form} onSubmit={handleSubmit}>
                <input type="text" spellCheck="false" id="city" name="city" placeholder="City" onChange={handleCityChange} />
                <span className="helper-text left-align red-text" id="helper-text" ></span>
                <button className="waves-effect   btn teal lighten-2" disabled={true} type="submit">Get forecast</button>
            </form>
        </div>
    )
}

export default Bar

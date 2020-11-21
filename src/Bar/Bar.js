
import React, { useState } from 'react';
import { WeatherContext } from '../App';
import makeCustomRequests from '../utils/makeCustomRequests';
import simpleFuncs from '../utils/simpleFunctions';
import styles from './Bar.module.css';


const Bar = ({ onAddForecast, onRequestSend, onResponseReceived }) => {

    
    

    const weatherData = React.useContext(WeatherContext)
    const [helperText, setHelperText] = useState(null)
    const [animationCLass, setAnimationClass] = useState(null)
    const [isSubmitButtonDisabled, setSubmitButtonDisabled] = useState(true)

    const animate = () => {
        setAnimationClass(styles.SunAnimation)

        setTimeout(() => {
            setAnimationClass("")
        }, 2500)
    }

    // useEffect(() => {
    //     helperEl = document.getElementById("helper-text");
    // })

    const handleCityChange = (e) => {
        if (e.target.value) {
            setSubmitButtonDisabled(false)
        }
        else setSubmitButtonDisabled(true)
    }

    const validation = (city) => {
        
        const WD = weatherData
        
        if (WD.length > 0) {
            WD.forEach(
                entry => {
                    if (entry.place.city === city) {
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

            let city = e.target["city"].value

            city = city.trim()
            city = city[0].toUpperCase() + city.substring(1)
            validation(city)

            setSubmitButtonDisabled(true)
            e.target["city"].value = ""
            setHelperText("");
            //====================    Get wanted data   ====================
            let resWeather;
            let hourTempArr; 
            let unified_img_url;
            let alt;
            let coords;

            
            
            
            
            
            
            try{
                
                
                coords = await makeCustomRequests.getCityCoordinates(city);
                
                [resWeather, hourTempArr] = await makeCustomRequests.getWeatherData(coords);
    
                [unified_img_url, alt] = await makeCustomRequests.getCityImage(city);
                
                  
            }catch(e){
                
                console.error( e )
            }
            
            
            onRequestSend();
           

           

           

            //====================    Sun animation   ====================

            animate()

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
            onResponseReceived();

         
        } catch (e) {
            setHelperText(e.message) 
            console.error(e.name + ' caught! \n' + e);
        }

    }

    return (
        <div className={styles.Bar}>
            <h1>Clima</h1>
            <div className={`${styles.Sun} ${animationCLass}`}  >
                <img src="imgs/sun/stylized-sun-bg.png" alt="sun" />
            </div>
            <form className={styles.Form} onSubmit={handleSubmit} data-test="bar-form">
                <input type="text"
                    data-test="city-input"
                    spellCheck="false"
                   
                    name="city"
                    placeholder="City"
                    onChange={handleCityChange} />
                <span className="helper-text left-align red-text" data-test="helper-span" >{helperText}</span>
                <button className="waves-effect   btn teal lighten-2" disabled={isSubmitButtonDisabled} data-test="submit-button" type="submit">Get forecast</button>
            </form>
        </div>
    )
}

export default Bar

import React, { useState, useEffect, useCallback } from 'react';
import { WeatherContext } from '../App';
import makeCustomRequests from '../utils/makeCustomRequests';
import simpleFuncs from '../utils/simpleFunctions';
import styles from './Bar.module.css';
import worldData from '../world.json'


// TODO validation of the input !

const Bar = ({ addForecastAct, setLoadingTrueAct }) => {

    const [animationCLass, setAnimationClass] = useState(null)
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [code, setCode] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const [error, setError] = useState("")
    const weatherData = React.useContext(WeatherContext)


    const cityDuplicationCheckCbk = useCallback((city) => {
        if (weatherData.length > 0) {
            weatherData.forEach(entry => {
                if (entry.place.city === city) setError("City duplication.")
            }
            )
        }
    }, [weatherData])

    useEffect(() => {
        console.log("USE_EFFECT")
        console.log(city, country, code)
        setError("")

        if (suggestions.length === 1) {
            if (country === suggestions[0].country && code !== suggestions[0].code)
                setCode(suggestions[0].code)
            if (code === suggestions[0].code && country !== suggestions[0].country)
                setCountry(suggestions[0].country)
        }

        if (suggestions.length === 0 && (country || code))
            setError("Invalid country/code input")


        if (!validateStringInput(city)) setError("Invalid city input")
        if (!validateStringInput(country)) setError("Invalid country input")
        if (!validateStringInput(code)) setError("Invalid code input")
        cityDuplicationCheckCbk(city)

    }, [suggestions, city, country, code, cityDuplicationCheckCbk])


    const animate = () => {
        setAnimationClass(styles.SunAnimation)

        setTimeout(() => {
            setAnimationClass("")
        }, 2500)
    }

    const validateStringInput = (cityVal) => {

        const pattern = new RegExp(/^([A-Z]+[ ]?)*$/, "i")
        const isPassed = pattern.test(cityVal)
        return isPassed
    }

    const cityChangeHandler = (e) => {

        if (e.target.value === "") {
            setCity("")
            return
        }
        let cityInpVal = e.target.value
        cityInpVal = simpleFuncs.capitalizeFirst(cityInpVal)
        setCity(cityInpVal)

    }

    const countryChangeHandler = (inputVal) => {

        if (inputVal === "") {
            setCountry("")
            setSuggestions([])
            return
        }
        inputVal = simpleFuncs.capitalizeFirst(inputVal)
        setCountry(inputVal)
        setCode("")


        const pattern = new RegExp(`^${inputVal}`, 'i')
        let matches = worldData.filter(item =>
            pattern.test(item.country)
        )
        setSuggestions(matches)

    }

    const codeChangeHandler = (inputVal) => {

        if (inputVal === "") {
            setCode("")
            setSuggestions([])
            return
        }

        inputVal = inputVal.toUpperCase()
        setCode(inputVal)
        setCountry("")

        const pattern = new RegExp(`^${inputVal}`, 'i')

        let matches = worldData.filter(item =>
            pattern.test(item.code)
        )

        setSuggestions(matches)

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setCity("")
        if (!city) {
            setError("No city")
            return
        }
        if (!(country === "" && code === "")) {
            if (code !== suggestions[0].code && country !== suggestions[0].country) {
                setError("Invalid with country/code")
                return
            }
        }


        let weatherData;
        let hourTempArr;
        let unified_img_url;
        let alt;
        let coords;

        setLoadingTrueAct();


        // API requests
        try {
            if (code) coords = await makeCustomRequests.getCityCoordinates(city, code);
            else coords = await makeCustomRequests.getCityCoordinates(city, undefined);
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
            <form className={styles.Form + " row"} onSubmit={handleSubmit} autoComplete="off">

                <input type="text"
                    className="col s9"
                    spellCheck="false"
                    placeholder="Country"
                    list="countryData"
                    value={country}
                    onChange={e => countryChangeHandler(e.target.value)}
                />

                <datalist id="countryData">
                    {suggestions.map((item, i) => {
                        if (i < 7)
                            return <option key={item.country} value={item.country}></option>
                        else
                            return null
                    })}
                </datalist>

                <input type="text"
                    className="col s2 offset-s1"
                    spellCheck="false"
                    placeholder="Code"
                    list="codeData"
                    value={code}
                    onChange={e => codeChangeHandler(e.target.value)}
                />

                <datalist id="codeData">
                    {suggestions.map((item, i) => {
                        if (i < 7)
                            return <option key={item.code} value={item.code}></option>
                        else
                            return null
                    })}
                </datalist>

                <input type="text"
                    className="col s12"
                    spellCheck="false"
                    placeholder="City"
                    onChange={cityChangeHandler} />
                <span className="helper-text left-align red-text"  >{error}</span>
                <button className="waves-effect   btn teal lighten-2" disabled={error || !city} type="submit">Get forecast</button>
            </form>
        </div>
    )
}

export default Bar

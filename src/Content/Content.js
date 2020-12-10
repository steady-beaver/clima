import React, { useContext } from 'react';
import { WeatherContext } from '../App';
import CityPanel from '../CityPanel/CityPanel';
import styles from './Content.module.css';

const Content = ({ isLoading, onDeleteCard }) => {

    let weatherData = useContext(WeatherContext)

    const spinner = (
        <div className={styles.CenterChild}>
            <div className="preloader-wrapper big active ">
                <div className="spinner-layer spinner-blue-only">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                        <div className="circle"></div>
                    </div><div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                </div>
            </div>
        </div>
    )

    let weatherList;


    if (weatherData.length === 0) {
        weatherList = (
            <div className={styles.CenterChild}>
                <div><span>Please enter city.</span></div>
            </div>
        )
    } else {
        weatherList = (
            weatherData.map(chunk => {
                return <CityPanel
                    key={chunk.place.city}
                    city={chunk.place.city}
                    sky={chunk.current.sky}
                    skyID={chunk.current.skyID}
                    desc={chunk.current.desc}
                    dayLight={chunk.current.dayLight}
                    temp={chunk.current.temp}
                    img_url={chunk.image.img_url}
                    img_alt={chunk.image.alt}
                    tempHourArr={chunk.daily.tempHourArr} 

                    onDeleteCard={onDeleteCard}
                    />
            })
        )
    }

    return (
        <div className={styles.Content}>
            <div className="row">
                {isLoading ? spinner : weatherList}
            </div>
        </div>
    )
}

export default Content

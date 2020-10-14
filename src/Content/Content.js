import React, { Component } from 'react';
import { connect } from 'react-redux';
import CityPanel from '../CityPanel/CityPanel';
import styles from './Content.module.css';

class Content extends Component {
    render() {
        { console.log("Component") }
        { console.log(this.props.weatherData) }



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


        if (this.props.weatherData.length === 0) {
            weatherList = (
                <div className={styles.CenterChild}>
                    <div><span>Please enter city.</span></div>
                </div>
            )
        } else {
            weatherList = (
                this.props.weatherData.map(chunk => {
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
                        tempHourArr={chunk.daily.tempHourArr} />
                })
            )
        }

        return (
            <div className={styles.Content}>
                <div className="row">
                    {this.props.isLoading ? spinner : weatherList}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        weatherData: state.weatherReducer.weatherArr,
        isLoading: state.weatherReducer.isLoading
    }
}

export default connect(mapStateToProps)(Content)
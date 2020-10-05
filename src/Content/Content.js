import React, { Component } from 'react';
import { connect } from 'react-redux';
import CityPanel from '../CityPanel/CityPanel';
import styles from './Content.module.css';

class Content extends Component {
    render() {

        let weatherList;
        
        if(this.props.weatherData.length === 0){
            weatherList = (<div className={styles.Initial}>No data</div>)
        }else{
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
                        tempHourArr={chunk.daily.tempHourArr}           />
                })
            )
        }

        return (
            <div className={styles.Content}>
                <div className="row">
                    {weatherList}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        weatherData: state.weatherReducer
    }
}

export default connect(mapStateToProps)(Content)
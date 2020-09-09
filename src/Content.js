import React, { Component } from 'react'
import { connect } from 'react-redux'
import CityPanel from './CityPanel'
import styles from './Content.module.css'

class Content extends Component {
    render() {

        let weatherList = (
            this.props.weatherData.map(chunk => {
                return <CityPanel key={chunk.city} city={chunk.city} sky={chunk.weather.sky} temp={chunk.weather.temp} img_url={chunk.image.img_url} img_alt={chunk.image.alt} />
            })
        )

        return (
            <div className={styles.Content + ' container '}>
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
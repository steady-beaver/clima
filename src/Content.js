import React, { Component } from 'react'
import { connect } from 'react-redux'
import CityPanel from './CityPanel'

class Content extends Component {
    render() {

        let weatherList = (
            this.props.weatherData.map(chunk => {
                return <CityPanel key={chunk.city} city={chunk.city} sky={chunk.weather.sky} temp={chunk.weather.temp} />
            })
        )

        return (
            <div>
                <h4>Your cities</h4>
                {weatherList}
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
import React, { Component } from 'react'
import { connect } from 'react-redux'

class Content extends Component {
    render() {
        return (
            <h4>{this.props.weatherData[0].city}</h4>
        )
    }
}

const mapStateToProps = state => {
    return {
        weatherData: state.weatherReducer
    }
}

export default connect(mapStateToProps)(Content)
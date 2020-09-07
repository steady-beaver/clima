import PropTypes from 'prop-types'
import React from 'react'

const CityPanel = ({ city, sky, temp }) => (
    <div className="col s12 m6" >
        <div className="card blue-grey darken-1">
            <div className="card-content white-text">
                <span className="card-title">{city} weather</span>
                <p>Sky above {city} will be {sky} with temperature of {temp}</p>
            </div>
            <div className="card-action">
                <a href="#">This is a link</a>
            </div>
        </div>
    </div >
)

CityPanel.propTypes = {
    city: PropTypes.string.isRequired,
    sky: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired
}

export default CityPanel



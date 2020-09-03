import PropTypes from 'prop-types'
import React from 'react'

const CityPanel = ({city, sky, temp}) => (
    <div>
        <span>Sky above {city} will be {sky} with temperature of {temp}</span>
    </div>
)

CityPanel.propTypes = {
    city: PropTypes.string.isRequired,
    sky: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired
}

export default CityPanel
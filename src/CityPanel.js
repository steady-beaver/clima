import React from 'react'

const CityPanel = ({city, sky, temp}) => (
    <div>
        <span>Sky above {city} will be {sky} with temperature of {temp}</span>
    </div>
)

export default CityPanel
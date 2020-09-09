import PropTypes from 'prop-types'
import React from 'react'
import styles from './CityPanel.module.css'

const CityPanel = ({ city, sky, temp, img_url, img_alt }) => (
    <div className="col s12 m4" >
        <div className={styles.CityPanel + " card "}>
            <div className="card-image">
                <img  src={img_url} alt={img_alt} />
                <span className="card-title ">{city}</span>
                <a className="btn-floating halfway-fab waves-effect waves-light teal lighten-2"><i className="material-icons">add</i></a>
            </div>
            <div className="card-content ">
                
                <p>Sky above {city} will be {sky} with temperature of {temp}</p>
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



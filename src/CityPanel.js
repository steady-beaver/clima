
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './CityPanel.module.css';

class CityPanel extends Component {

    WEATHER_API_KEY = "ccec765bf7b5d7e644d77172a0eadb7c";

    componentDidMount() {

        const M = window.M
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {});

    }

    //{ city, sky, temp, img_url, img_alt } = this.props

    handleForecast = async () => {
        //console.log(`api.openweathermap.org/data/2.5/forecast?q=${this.props.city}&appid=${this.WEATHER_API_KEY}`)
        let resForecast = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${this.props.city}&appid=${this.WEATHER_API_KEY}&units=metric`)
        resForecast = await resForecast.json()
        console.log(resForecast)
    }

    render() {
        return (
            <div>
                <div className="col s12 m4" >
                    <div className={styles.CityPanel + " card "}>
                        <div className="card-image">
                            <img src={this.props.img_url} alt={this.props.img_alt} />
                            <span className="card-title ">{this.props.city}</span>
                            <a onClick={this.handleForecast} className="btn-floating  halfway-fab waves-effect waves-light teal lighten-2 modal-trigger" href={"#" + this.props.city + "modal"} ><i className="material-icons">add</i></a>

                        </div>

                        <div className="card-content ">
                            <p>Sky above {this.props.city} will be {this.props.sky} with temperature of {this.props.temp}</p>
                        </div>
                    </div>
                </div >


                
                <div id={this.props.city + "modal"} className="modal">
                    <div className="modal-content">
                        <h4>{this.props.city}</h4>
                        <p>Be strong </p>
                        <p>{this.props.tempHourArr.length}</p>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
                    </div>
                </div>
            </div>
        )
    }
}


CityPanel.propTypes = {
    city: PropTypes.string.isRequired,
    sky: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    //TODO: prop-types for img_url, img_alt
}

export default CityPanel







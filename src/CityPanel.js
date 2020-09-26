
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './CityPanel.module.css';
import LineChart from './LineChart/LineChart';

class CityPanel extends Component {

    WEATHER_API_KEY = "ccec765bf7b5d7e644d77172a0eadb7c";

    componentDidMount() {

        const M = window.M
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {});

    }

    //{ city, sky, temp, img_url, img_alt } = this.props

 




    render() {
        return (
            <div className={styles.modal}>
                <div className="col s12 m4" >
                    <div className="card">
                        <div className="card-image">
                            <img src={this.props.img_url} alt={this.props.img_alt} />
                            <span className="card-title ">{this.props.city}</span>
                            <a  className="btn-floating  halfway-fab waves-effect waves-light teal lighten-2 modal-trigger" href={"#" + this.props.city + "Modal"} ><i className="material-icons">add</i></a>

                        </div>

                        <div className="card-content ">
                            <p>Sky above {this.props.city} will be {this.props.sky} with temperature of {Math.round(this.props.temp)}&#x2103;</p>
                        </div>
                    </div>
                </div >


                
                <div id={this.props.city + "Modal"} className={"modal " + styles.myModal}>
                    <div className="modal-content">
                        <h4>{this.props.city}</h4>
                        <LineChart city={this.props.city} />
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







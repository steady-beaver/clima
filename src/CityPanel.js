
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './CityPanel.module.css';

class CityPanel extends Component {

    componentDidMount() {

        const M = window.M
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {});

    }

    //{ city, sky, temp, img_url, img_alt } = this.props

    render() {
        return (
            <div>
                <div className="col s12 m4" >
                    <div className={styles.CityPanel + " card "}>
                        <div className="card-image">
                            <img src={this.props.img_url} alt={this.props.img_alt} />
                            <span className="card-title ">{this.props.city}</span>
                            <a className="btn-floating  halfway-fab waves-effect waves-light teal lighten-2 modal-trigger" href={"#" + this.props.city + "modal"} ><i className="material-icons">add</i></a>

                            <div id={this.props.city + "modal"} className="modal">
                                <div className="modal-content">
                                    <h4>{this.props.city}</h4>
                                    <p>My text</p>
                                </div>
                                <div className="modal-footer">
                                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
                                </div>
                            </div>

                        </div>

                        <div className="card-content ">
                            <p>Sky above {this.props.city} will be {this.props.sky} with temperature of {this.props.temp}</p>
                        </div>
                    </div>
                </div >
            </div>
        )
    }
}


CityPanel.propTypes = {
    city: PropTypes.string.isRequired,
    sky: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired
}

export default CityPanel







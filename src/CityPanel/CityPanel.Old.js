import M from "materialize-css/dist/js/materialize.min.js";
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BarChartCustom from '../ChartsNew/BarChartCustom/BarChartCustom';
import LineChartCustom from '../ChartsNew/LineChartCustom/LineChartCustom';
import SimpleFuncs from '../utils/simpleFunctions';
import styles from './CityPanel.module.css';



class CityPanel extends Component {

    //{ city, sky, skyID, temp, desc, dayLight, img_url, img_alt } = this.props

    canvasRef = React.createRef();


    drawCurrentWeather = () => {

        var skycons = new window.Skycons({ "color": "rgb(77, 182, 172)" });
        skycons.add(this.canvasRef.current, SimpleFuncs.pickProperSVG(this.props.sky, this.props.skyID, this.props.dayLight));
        skycons.play();
    }

    modalInitialization = () => {
        document.addEventListener('DOMContentLoaded', function (e) {

            const elems = document.querySelector('.modal');
            M.Modal.init(elems, {});
        });
    }



    componentDidMount() {

        const elems = document.querySelectorAll('.modal');
        M.Modal.init(elems, {});

        this.drawCurrentWeather();
    }

    render() {
        return (
            <div className={styles.CityCard}>
                <div className="col s12 m4" >
                    <div className="card">
                        <div className={"card-image " + styles.UpperPart}>
                            <img src={this.props.img_url} alt={this.props.img_alt} width="300" height="200" />
                            <span className="card-title ">{this.props.city}</span>
                            <a className="btn-floating  halfway-fab waves-effect  teal lighten-2 modal-trigger" href={"#" + this.props.city + "Modal"} ><i className="material-icons">add</i></a>
                        </div>
                        <div className={"card-content " + styles.Content}>
                            <div>
                                <canvas ref={this.canvasRef} width="300" height="300"/>
                            </div>
                            <div className={styles.Temp}>{Math.round(this.props.temp)+"\u00B0"}</div>
                            <div className={styles.Desc}>{SimpleFuncs.capitalizeFirst(this.props.desc)}</div>
                        </div>
                    </div>
                </div >



                <div id={this.props.city + "Modal"} className={"modal modal-fixed-footer " + styles.Modal}>
                    <div className="modal-content">
                        <h4>{this.props.city}</h4>
                        <LineChartCustom city={this.props.city} />
                        <BarChartCustom city={this.props.city} />
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">OK</a>
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
    img_url: PropTypes.string.isRequired,
    img_alt: propTypes.string,
    //TODO: prop-types for img_url, img_alt
}

export default CityPanel







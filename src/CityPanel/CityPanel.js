import M from "materialize-css/dist/js/materialize.min.js";
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import BarChartCustom from '../ChartsNew/BarChartCustom/BarChartCustom';
import LineChartCustom from '../ChartsNew/LineChartCustom/LineChartCustom';
import SimpleFuncs from '../utils/simpleFunctions';
import styles from './CityPanel.module.css';


const CityPanel = (props) => {
    const canvasRef = React.createRef();

    const drawCurrentWeather = () => {

        var skycons = new window.Skycons({ "color": "rgb(77, 182, 172)" });
        skycons.add(canvasRef.current, SimpleFuncs.pickProperSVG(props.sky, props.skyID, props.dayLight));
        skycons.play();
    }



    useEffect(() => {
        document.addEventListener('DOMContentLoaded', function (e) {

            const elems = document.querySelector('.modal');
            M.Modal.init(elems, {});
        });
    }, [])

    useEffect(() => {
        const elems = document.querySelectorAll('.modal');
        M.Modal.init(elems, {});

        drawCurrentWeather();
    })


    return (
        <div className={styles.CityCard}>
            <div className="col s12 m4" >
                <div className="card">
                    {/* Upper part */}
                    <div className={"card-image " + styles.UpperPart}>
                        <img src={props.img_url} alt={props.img_alt} width="300" height="200" />
                        <span className="card-title ">{props.city}</span>
                        <a className="btn-floating  halfway-fab waves-effect  teal lighten-2 modal-trigger" href={"#" + props.city + "Modal"} >
                            <i className="material-icons">add</i>
                        </a>
                    </div>

                    {/* Lower part */}
                    <div className={"card-content " + styles.Content}>
                        <div>
                            <canvas ref={canvasRef} width="300" height="300" />
                        </div>
                        <div className={styles.Temp}>{Math.round(props.temp) + "\u00B0"}</div>
                        <div className={styles.Desc}>{SimpleFuncs.capitalizeFirst(props.desc)}</div>
                        <div className={styles.DeleteBtn}>
                        <a className="btn-floating " href={`#${props.city}Remove`} onClick={(e) => props.deleteCityCardAct(props.city)}>
                                <i className="material-icons waves-effect red">delete_outline</i>
                            </a>
                        </div>
                    </div>
                </div>
            </div >


            {/* Modal */}

            <div id={props.city + "Modal"} className={"modal modal-fixed-footer " + styles.Modal}>
                <div className="modal-content">
                    <h4>{props.city}</h4>
                    <LineChartCustom city={props.city} />
                    <BarChartCustom city={props.city} />
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">OK</a>
                </div>
            </div>
        </div>
    )
}

CityPanel.propTypes = {
    city: PropTypes.string.isRequired,
    sky: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    img_url: PropTypes.string.isRequired,
    img_alt: PropTypes.string,
}

export default CityPanel

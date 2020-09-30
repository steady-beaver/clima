
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './CityPanel.module.css';
import LineChart from './LineChart/LineChart';



class CityPanel extends Component {

    //{ city, sky, skyID, temp, desc, dayLight, img_url, img_alt } = this.props

    canvasRef = React.createRef();

    drawCurrentWeather = () => {
        
        
        const pickProperSVG = (sky, skyID, dayLight) => {
            switch(sky) {
                case 'Thunderstorm': return window.Skycons.WIND;
                case 'Drizzle': return window.Skycons.RAIN;
                case 'Rain': return window.Skycons.SLEET;
                case 'Snow': return window.Skycons.SNOW;
                case 'Clear': {
                    if(dayLight) 
                        return window.Skycons.CLEAR_DAY;
                    else
                        return window.Skycons.CLEAR_NIGHT;
                }
                    
                case 'Clouds': {
                    // console.log("SkyID: " + skyID + " " + typeof(skyID))
                    if(skyID === 801 || skyID === 802){
                        if(dayLight) return window.Skycons.PARTLY_CLOUDY_DAY;
                        else return window.Skycons.PARTLY_CLOUDY_NIGHT;
                    }
                    if(skyID === 803 || skyID === 804)
                        return window.Skycons.CLOUDY;
                    
                }

                default: {
                    if(skyID >= 700) return window.Skycons.FOG;
                    else throw new Error("Not relevant current weather, caught in pickProperSVG function ")
                }
            }
        }
        

        var skycons = new window.Skycons({"color":"rgb(77, 182, 172)"});
        skycons.add(this.canvasRef.current,  pickProperSVG(this.props.sky, this.props.skyID, this.props.dayLight)  );
        // skycons.add(this.canvasRef.current,  window.Skycons.CLOUDY );
        skycons.play();
    }

    componentDidMount() {

        const M = window.M
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems, {});

        this.drawCurrentWeather()
    }

    render() {
        return (
            <div className={styles.modal}>
                <div className="col s12 m4" >
                    <div className="card">
                        <div className="card-image">
                            <img src={this.props.img_url} alt={this.props.img_alt} />
                            <span className="card-title ">{this.props.city}</span>
                            <a className="btn-floating  halfway-fab waves-effect waves-light teal lighten-2 modal-trigger" href={"#" + this.props.city + "Modal"} ><i className="material-icons">add</i></a>

                        </div>

                        <div className="card-content ">
                            {/* <p>Sky above {this.props.city} will be {this.props.sky} with temperature of {Math.round(this.props.temp)}&#x2103;</p> */}
                            <canvas ref={this.canvasRef} width="128" height="128" />
                            <div>{this.props.sky}</div>
                            <div>{this.props.temp}</div>
                            <div>{this.props.desc}</div>
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







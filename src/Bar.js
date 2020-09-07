import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions/actions';
import styles from './Bar.module.css';

class Bar extends Component {

    state = {
        API_KEY_NAME: "ccec765bf7b5d7e644d77172a0eadb7c"
    }

    componentDidMount() {
        console.log("RENDER")
    }


    handleCityChange = (e) => {
        const elementSubmitButton = document.querySelector('form button')

        if (e.target.value) {

            elementSubmitButton.disabled = false

        }
        else elementSubmitButton.disabled = true
    }

    handleSubmit = async (e) => {

        try {

            e.preventDefault();
            let city = e.target["city"].value;
            e.target["city"].value = ""
            e.target.children[1].disabled = true


            let res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.state.API_KEY_NAME}`)
            res = await res.json()

            console.log(res)

            let weatherObj = {
                city: res.name,
                weather: {
                    temp: res.main.temp,
                    sky: res.weather[0].main
                },
                forecast: null
            }

            this.props.onAddForecast(weatherObj);

        } catch (e) {
            console.error(e);
            return;
        }

    }

    render() {

        const myStyle = {   margin: '20px 0 0 0'      }

        return (
            <div className="container " >
                <h4>Bar</h4>
                <form className = {styles.BarForm} onSubmit={this.handleSubmit}>
                    <div className='row'>
                        <div className="col s6 offset-s3">
                            <input style={myStyle} type="text" name="city" placeholder="City" onChange={this.handleCityChange} />
                        </div>
                    </div>
                    <button className="waves-effect waves-light btn" disabled={true} type="submit">Get forecast</button>
                </form>
            </div>
        );
    }
}



const mapDispatchToProps = dispatch => {
    return {
        onAddForecast: (weatherObj) => dispatch(actions.GET_CITY_WEATHER(weatherObj))
    }
}



export default connect(null, mapDispatchToProps)(Bar)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions/actions';

class Bar extends Component{

    state = {
        API_KEY_NAME: "ccec765bf7b5d7e644d77172a0eadb7c"
    }

    handleSubmit = async (e) => {
        
        try {

            e.preventDefault();
            let city = e.target["city"].value;
            e.target["city"].value = ""
            
            let res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.state.API_KEY_NAME}`)
            res = await res.json()

            let weatherObj = {
                city: res.name,
                weather: {
                    temp: res.main.temp,
                    sky: res.weather[0].description
                },
                forecast: null
            }    
            
            this.props.onAddForecast(weatherObj);

        } catch(e) {
            console.error(e);   
            return;
        }
        
    }

    render(){
        
        return (
            <div>
                <h4>Bar</h4>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="city" placeholder="City" />
                    <button type="submit">Get forecast</button>
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


export default connect (null , mapDispatchToProps) (Bar)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions/actions';
import styles from './Bar.module.css';

class Bar extends Component {

    state = {
        WEATHER_API_KEY: "ccec765bf7b5d7e644d77172a0eadb7c",
        IMAGES_API_KEY: "Cs5VM9ECaEgKddglzuvOxLIDx5rL86aanVD9VhtDY-4"
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

    unifyImg = (img_url) => {
        img_url = img_url.replace('&w=400','&w=400&h=200')
        img_url = img_url.replace('&fit=max','&fit=crop')
        return img_url
    }

    handleSubmit = async (e) => {

        try {

            e.preventDefault();
            let city = e.target["city"].value;
            e.target["city"].value = ""
            e.target.children[1].disabled = true


            let resWeather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.state.WEATHER_API_KEY}`)
            resWeather = await resWeather.json()
            
            console.log("resWeather")
            console.log(resWeather)

            let resImages = await fetch(`https://api.unsplash.com/search/photos?client_id=${this.state.IMAGES_API_KEY}&page=1&per_page=3&query=${city}`)
            resImages = await resImages.json()

            console.log("resImages")
            console.log(resImages)

            const unified_img_url = this.unifyImg(resImages.results[2].urls.small)

            
            //w=260&h=130
            //img_url: "https://images.unsplash.com/photo-1589809328135-34ad5225586f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE2NDE2M30",



            let weatherObj = {
                city: resWeather.name,
                img_url: unified_img_url,
                weather: {
                    temp: resWeather.main.temp,
                    sky: resWeather.weather[0].main
                },
                forecast: null
            }

            this.props.onAddForecast(weatherObj);

        } catch (e) {
            console.log("HERE")
            console.error(e);
            return;
        }

    }

    render() {

        const myStyle = {   margin: '20px 0 0 0'      }

        return (
            <div className="container " >
                <form className = {styles.BarForm} onSubmit={this.handleSubmit}>
                    <div className='row'>
                        <div className="col s6 offset-s3">
                            <input style={myStyle} type="text" name="city" placeholder="City" onChange={this.handleCityChange} />
                        </div>
                    </div>
                    <button className="waves-effect waves-light btn teal lighten-2" disabled={true} type="submit">Get forecast</button>
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
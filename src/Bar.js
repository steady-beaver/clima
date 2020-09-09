import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions/actions';
import styles from './Bar.module.css';
import def_img from './utils/def_image_500x200.jpg';


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
        img_url = img_url.replace('&w=400','&w=500&h=200')
        img_url = img_url.replace('&fit=max','&fit=crop')
        return img_url
    }

    handleSubmit = async (e) => {

        const helperEl = document.getElementById('helper-text')

        try {

            e.preventDefault();
            let city = e.target["city"].value;
            e.target["city"].value = ""
            e.target.children[1].disabled = true


            let resWeather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.state.WEATHER_API_KEY}`)
            resWeather = await resWeather.json()
            
            //console.log("resWeather")
            //console.log(resWeather)
            if(resWeather.cod != 200) {
                throw new Error(resWeather.message)
            }

            let resImages = await fetch(`https://api.unsplash.com/search/photos?client_id=${this.state.IMAGES_API_KEY}&page=1&per_page=3&query=${city}`)
            resImages = await resImages.json()

            let unified_img_url = "";
            let alt = "";


            if(resImages.total == 0) {
                unified_img_url = def_img
                //"https://www.developco.com/wp-content/uploads/2015/08/CCCC-home-2-500x200.jpg"
                alt = "Unfortunately Unsplash API does not provide images for that town."
            }else{
                unified_img_url = this.unifyImg(resImages.results[2].urls.small)
                alt = resImages.results[2].alt_description
            }

            //console.log("resImages")
            //console.log(resImages)


            let weatherObj = {
                city: resWeather.name,
                image: {
                    img_url: unified_img_url,
                    alt: alt
                },
                weather: {
                    temp: resWeather.main.temp,
                    sky: resWeather.weather[0].main
                },
                forecast: null
            }

            this.props.onAddForecast(weatherObj);
            helperEl.innerHTML = "";

        } catch (e) {
            
            helperEl.innerHTML = e.message;
            
            console.error(e.name + ' caught!');
        }

    }

    render() {

        const myStyle = {   margin: '20px 0 0 0'      }

        return (
            <div className="container " >
                <form className = {styles.BarForm} onSubmit={this.handleSubmit}>
                    <div className='row'>
                        <div className="input-field inline col s6 offset-s3">
                            <input style={myStyle} type="text" id="city" name="city" placeholder="City" onChange={this.handleCityChange}/>
                            <span className="helper-text left-align red-text" id="helper-text"></span>
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
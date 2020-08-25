import React, { Component } from 'react';

class Bar extends Component{

    state = {
        API_KEY_NAME: "ccec765bf7b5d7e644d77172a0eadb7c"
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        console.log(this.state.API_KEY_NAME)
        let cityName = e.target["city"].value
        const res = await fetch(`http://api.openweathermap.org/data/2.5/find?q=${cityName}&units=metric&appid=${this.state.API_KEY_NAME}`)
        //const res = await fetch(`http://bulk.openweathermap.org/sample/`)
        const res2 = await res.json()
        console.log(res2)
    }

    render(){
        return (
            <div>
                <h4>Bar</h4>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <input type="text" name="city" placeholder="City" />
                    <button type="submit">Get forecast</button>
                </form>
            </div>
        );
    }
}

export default Bar
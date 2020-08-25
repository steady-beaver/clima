import React, { Component } from 'react';

class Bar extends Component{

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target["city"].value)
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
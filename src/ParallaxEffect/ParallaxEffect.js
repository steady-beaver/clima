import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import React, { Component } from 'react';
import styles from './ParallaxEffect.module.css';



class ParallaxEffect extends Component {

    componentDidMount() {
        var elems = document.querySelectorAll('.parallax');
        var instances = M.Parallax.init(elems, {});
    }


    render() {
        return (
            <div className={"parallax-container " + styles.fullWidth + " " + styles.myParallax}>
                <div className="parallax">
                    <img src="imgs/ParallaxEffect/parallax-effect-1.jpg" />
                </div>
            </div>
        )
    }
}

export default ParallaxEffect

import M from "materialize-css/dist/js/materialize.min.js";
import React, { Component } from 'react';
import styles from './ParallaxEffect.module.css';



class ParallaxEffect extends Component {

    componentDidMount() {
        document.addEventListener('DOMContentLoaded', function(e) {
            const elems = document.querySelectorAll('.parallax');
            M.Parallax.init(elems, {    });
          });
    }


    render() {
        return (
            <div className={"parallax-container " + styles.fullWidth + " " + styles.myParallax}>
                <div className="parallax">
                    <img src="imgs/ParallaxEffect/parallax-effect-1.jpg" alt="Just cool parallax effect" />
                </div>
            </div>
        )
    }
}

export default ParallaxEffect

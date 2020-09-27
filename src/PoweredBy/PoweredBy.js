import React, { Component } from 'react'
import styles from './PoweredBy.module.css'
import TechCard from './TechCards/TechCard'


export class PoweredBy extends Component {

    state = {
        data:[
            {
                alt: "React Official Website",
                src: "imgs/PoweredBy/react-logo.png",
                href:"https://reactjs.org/",
            },
            {
                alt: "Redux Official Website",
                src: "imgs/PoweredBy/redux-logo.png",
                href: "https://redux.js.org/",
            },
            {
                alt: "Jest testing library official website",
                src: "imgs/PoweredBy/jest-logo.png",
                href: "https://jestjs.io/",
            },
            {
                alt: "Enzyme testing library official website",
                src: "imgs/PoweredBy/enzyme-logo.png",
                href: "https://enzymejs.github.io/enzyme/",
            },
            {
                alt: "Materialize-css Official Website",
                src: "imgs/PoweredBy/materialize-logo.png",
                href: "https://materializecss.com/",
            },
            {
                alt: "WebdriverIO testing library official website",
                src: "imgs/PoweredBy/webdriverio-logo.png",
                href: "https://webdriver.io/",
            },
            {
                alt: "Nivo visual library official website",
                src: "imgs/PoweredBy/nivo-logo.png",
                href: "https://nivo.rocks/",
            },
            {
                alt: "Green Sock GSAP animation library official website",
                src: "imgs/PoweredBy/gsap-logo.png",
                href: "https://greensock.com/gsap/"
            },
        ]
    }   


    render() {

        return (
            <div className={styles.technologyBox}>
                <div className="row ">               
                    
                    {this.state.data.map( (tech, i) => ( <TechCard 
                            href = {tech.href}
                            src = {tech.src}
                            alt = {tech.alt} 
                            key = {i}
                        /> ))}

                </div>
            </div>
        )
    }
}

export default PoweredBy



import React, { Component } from 'react'
import styles from './PoweredBy.module.css'
import TechCard from './TechCards/TechCard'
import techData from './TechInfo'


export class PoweredBy extends Component {

    state = {
        data: techData
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



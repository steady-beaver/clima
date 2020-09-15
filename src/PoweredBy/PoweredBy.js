import React from 'react'
import styles from './PoweredBy.module.css'

function PoweredBy() {
    return (
        <div className={styles.technologyBox}>
            <div className="row ">
                <div className="col s12 m3">
                    <img src="imgs/react-logo.png" alt="React Official Website" />
                </div>
                <div className="col s12 m3">
                    <img src="imgs/redux-logo.png" alt="Redux Official Website" />
                </div>
                <div className="col s12 m3">
                    <img src="imgs/jest-logo.png" alt="Jest testing library official website" />
                </div>
                <div className="col s12 m3">
                    <img src="imgs/enzyme-logo.png" alt="Enzyme testing library official website" />
                </div>
                <div className="col s12">   
                    <div className="row " id={styles.lastRow}>
                        <div className="col s12 m4" >
                            <img src="imgs/materialize-logo.png" alt="Materialize-css Official Website" />
                        </div>
                        <div className="col s12 m4">
                            <img src="imgs/webdriverio-logo.png" alt="WebdriverIO testing library official website" />
                        </div>
                        <div className="col s12 m4">
                            <img src="imgs/nivo-logo.png" alt="Nivo visual library official website" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PoweredBy

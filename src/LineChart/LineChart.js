import React, { Component } from 'react'
import { connect } from 'react-redux'
import CustomChart from './CustomChart'
import styles from './LineChart.module.css'




class LineChart extends Component {

    extractDataFromStore = (city) => {
        const WD = this.props.weatherData
        for (let i in WD) {
            if (WD[i].place.city === city) return WD[i].daily.tempHourArr
        }

        throw new Error("extractDataFromStore could not find relative data!")

    }

    data = [
        {
            "id": this.props.city,
            "color": "hsl(342, 70%, 50%)",
            "data": this.extractDataFromStore(this.props.city)
        }
    ]


    render() {
        return (
            <div className={styles.LineChart}>
                <CustomChart data={this.data} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        weatherData: state.weatherReducer
    }
}

export default connect(mapStateToProps)(LineChart)
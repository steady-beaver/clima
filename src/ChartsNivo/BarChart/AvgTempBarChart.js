import { ResponsiveBar } from '@nivo/bar'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './AvgTempBarChart.module.css'


class AvgTempBarChart extends Component {

    // data = [
    //     {
    //         "date": "formatted date 1",
    //         "average temperature": 32
    //     },
    // ]

    extractDataFromStore = (city) => {
        const WD = this.props.weatherData
        for (let i in WD) {
            if (WD[i].place.city === city) return WD[i].forecast
        }

        throw new Error("extractDataFromStore could not find relative data!")
    }

    render() {
        return (
            <div className={styles.BarChart}>


                <ResponsiveBar
                    data={this.extractDataFromStore(this.props.city)}
                    keys={['average temperature']}
                    indexBy="date"
                    margin={{ top: 30, right: 30, bottom: 42, left: 30 }}
                    colors="rgb(77, 182, 172)"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 30,
                        legendPosition: 'middle',
                        legendOffset: 32
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Average temperature \u2103',
                        legendPosition: 'middle',
                        legendOffset: -40
                    }}
                    enableGridX={false}
                    legends={[]}
                    animate={false}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        weatherData: state.weatherReducer
    }
}

export default connect(mapStateToProps)(AvgTempBarChart)

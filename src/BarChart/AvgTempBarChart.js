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

                {/* <Customization data={this.extractDataFromStore(this.props.city)} className={styles.BarChart} /> */}

                <ResponsiveBar
                    data={this.extractDataFromStore(this.props.city)}
                    keys={['average temperature']}
                    indexBy="date"
                    margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
                    padding={0.3}
                    colors={{ scheme: 'nivo' }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: '8 days forecast',
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
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
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

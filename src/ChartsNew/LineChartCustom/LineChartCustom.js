import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styles from '../../CityPanel/CityPanel.module.css';


// tempHourArr: [{ 
//     x: formattedDate, {string}
//     y: tempC, {string}
// }]


class LineChartCustom extends Component {


    extractDailyData = (city) => {
        const WD = this.props.weatherData
        for (let i in WD) {
            if (WD[i].place.city === city) return WD[i].daily.tempHourArr
        }
        throw new Error("extractDataFromStore could not find relative data!")
    }


    render() {
        return (
            <div className={styles.ChartContainer}>
                <ResponsiveContainer >
                    <LineChart
                        data={this.extractDailyData(this.props.city)}
                        margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>

                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" label={{ value: "Time in hours", position: "insideRight", dy: 20 }} />
                        <YAxis type="number" domain={["auto", "auto"]} allowDecimals={false} label={{ value: "Temperature \u2103", position: "insideLeft", angle: -90, dy: 40 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="hours" stroke="#4DB6AC" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer >
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        weatherData: state.weatherReducer
    }
}

export default connect(mapStateToProps)(LineChartCustom)


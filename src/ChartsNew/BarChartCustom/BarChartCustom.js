import React, { Component, useContext } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { WeatherContext } from '../../App';
import styles from '../../CityPanel/CityPanel.module.css';


class CustomizedAxisTick extends Component {
    render() {
        const { x, y, payload } = this.props;

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} fill="#666" transform="rotate(24)"> {payload.value} </text>
            </g>
        );
    }
}


const BarChartCustom = (props) => {

    let weatherData = useContext(WeatherContext)

    const extractForecast = (city) => {
        for (let i in weatherData) {
            if (weatherData[i].place.city === city) return weatherData[i].forecast
        }

        throw new Error("extractDataFromStore could not find relative data!")
    }

    return (
        <div className={styles.ChartContainer + " " + styles.BarChartContainer}>
            <h6>7-days forecast</h6>
            <ResponsiveContainer >
                <BarChart
                    data={extractForecast(props.city)}
                    margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>

                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" height={60} tick={<CustomizedAxisTick />} interval={0} />
                    <YAxis type="number" domain={['dataMin - 2', 'auto']} minTickGap={3} label={{ value: "Average temperature \u2103", position: "insideLeft", angle: -90, dy: 60 }} />
                    <Tooltip labelFormatter={lbl => { return null }} formatter={(value, name, props) => { return [`${props.payload.avr}\u2103`, `Average temperature on ${props.payload.date}`] }} separator=" is " />
                    <Bar dataKey="avr" fill="#4DB6AC" />
                </BarChart>
            </ResponsiveContainer >
        </div>
    )
}

export default BarChartCustom


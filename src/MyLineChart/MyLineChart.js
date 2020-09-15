import { ResponsiveLine } from '@nivo/line'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './MyLineChart.module.css'





class MyLineChart extends Component {

    extractDataFromStore = (city) => {
        const WD = this.props.weatherData
        for(let i in WD){
            if(WD[i].place.city === city) return WD[i].daily.tempHourArr
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
            <div className={styles.MyLineChart}>
                <ResponsiveLine
                    data={this.data}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{ type: 'point' }}
                    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'transportation',
                        legendOffset: 36,
                        legendPosition: 'middle'
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'count',
                        legendOffset: -40,
                        legendPosition: 'middle'
                    }}
                    colors={{ scheme: 'nivo' }}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabel="y"
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                />
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        weatherData: state.weatherReducer
    }
}

export default connect (mapStateToProps) (MyLineChart)
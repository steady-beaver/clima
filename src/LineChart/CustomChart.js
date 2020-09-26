import { ResponsiveLine } from '@nivo/line'
import React from 'react'

const CustomChart = (props) => {
    return(
        <ResponsiveLine
                    data={props.data}
                    margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
                    xScale={{ type: 'point' }}  // # 
                    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false}}
                    curve="cardinal"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: 'bottom',
                        tickValues: 4,
                        tickSize: 5,
                        tickPadding: 5,
                        legend: 'Time (in hours)',
                        legendOffset: 36,
                        legendPosition: 'middle'
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickValues: 5,
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Temperature \u2103' ,
                        legendOffset: -40,
                        legendPosition: 'middle'
                    }}
                    enableGridX={false}
                    colors={{ scheme: 'nivo' }}
                    enablePointLabel={false}
                    isInteractive={true}
                    enableCrosshair={false}
                    useMesh={true}
                    legends={[]}
                />
    )
}

export default CustomChart
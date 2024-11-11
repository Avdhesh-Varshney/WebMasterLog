import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useTheme } from '../context/ThemeContext'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

function Graph({graphData}) {
    const {theme} = useTheme()
  return (
    <>
        <Line 
            data={
                {
                    labels: graphData.map(i => i[0]),
                    datasets: [
                        {
                            data: graphData.map(i => i[1]),
                            label: 'WPM',
                            borderColor: theme.typeBoxText
                        }
                    ]
                }
            }
            options={{
                scales: {
                x: {
                    title: {
                    display: true,
                    text: 'Time (seconds)'
                    }
                },
                y: {
                    title: {
                    display: true,
                    text: 'Words Per Minute'
                    }
                }
                }
            }}
        />
    </>
  )
}

export default Graph
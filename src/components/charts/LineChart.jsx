'use client'

import { Line } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js"

const LineChart = ({data}) => {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

  const options = {
    scales:{
      y:{
        min: 0
      },
      x: {
        ticks: { color: 'blue' }
      }
    },
    plugins:{
      legend: {
        display: false
      }
    }
  };

  return (
    <Line data={data} options={options} className="bg-white px-4 py-6 w-full max-w-screen mx-auto"></Line>
  )
}

export default LineChart
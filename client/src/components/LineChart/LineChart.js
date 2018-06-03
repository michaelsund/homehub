import * as React from 'react'
import { appleStock } from '@vx/mock-data'
import './LineChart.css'

const data = appleStock
const width = 750
const height = 400
const margin = {
  top: 60,
  bottom: 60,
  left: 80,
  right: 80,
}
const xMax = width - margin.left - margin.right
const yMax = height - margin.top - margin.bottom
const x = d => new Date(d.date)
const y = d => d.close

class LineChart extends React.Component<> {
  render() {
    return (
      <p>Linechart!</p>
    )
  }
}

export default LineChart

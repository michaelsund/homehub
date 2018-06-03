// @flow

import React from 'react'
import { letterFrequency } from '@vx/mock-data'
import { Group } from '@vx/group'
import { Bar } from '@vx/shape'
import { scaleLinear, scaleBand } from '@vx/scale'

type Props = {
  width: number,
  height: number,
  margin: Object
}

class LineChart extends React.Component<Props> {
  render() {
    const data = letterFrequency
    const xMax = this.props.width - this.props.margin.left - this.props.margin.right
    const yMax = this.props.height - this.props.margin.top - this.props.margin.bottom
    const x = d => d.letter
    const y = d => +d.frequency * 100
    const xScale = scaleBand({
      rangeRound: [0, xMax],
      domain: data.map(x),
      padding: 0.4,
    })

    const yScale = scaleLinear({
      rangeRound: [yMax, 0],
      domain: [0, Math.max(...data.map(y))],
    })

    const compose = (scale, accessor) => data => scale(accessor(data))
    const xPoint = compose(xScale, x)
    const yPoint = compose(yScale, y)

    return (
      <svg width={this.props.width} height={this.props.height}>
        {data.map((d, i) => {
          const barHeight = yMax - yPoint(d)
          return (
            <Group key={`bar-${i}`}>
              <Bar
                x={xPoint(d)}
                y={yMax - barHeight}
                height={barHeight}
                width={xScale.bandwidth()}
                fill='#fc2e1c'
              />
            </Group>
          )
        })}
      </svg>
    )
  }
}

export default LineChart

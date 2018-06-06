// @flow

import React from 'react'
import { Group } from '@vx/group'
import { genBins } from '@vx/mock-data'
import { scaleLinear } from '@vx/scale'
import { HeatmapCircle } from '@vx/heatmap'
import { extent, min, max } from 'd3-array'

type Props = {
  data: Array,
  width: number,
  height: number,
  margin: Object
}

type State = {
  data: Array
}

class HeatmapChart extends React.Component<Props, State> {
  state = {
    data: []
  }

  // componentWillReceiveProps = nextProps => {
  //   if (nextProps.data.length) {
  //     this.setState({ data: nextProps.data })
  //   }
  // }

  render() {
    const data = genBins(4, 4)
    console.log(data)

    const x = d => d.bin
    const y = d => d.bins
    const z = d => d.count

    const size = this.props.width > (this.props.margin.left + this.props.margin.right)
      ? this.props.width - this.props.margin.left - this.props.margin.right
      : this.props.width
    const xMax = size / 2
    const yMax = this.props.height - this.props.margin.bottom
    const dMin = min(data, d => min(y(d), x))
    const dMax = max(data, d => max(y(d), x))
    const dStep = dMax / data[0].bins.length
    const bWidth = xMax / data.length
    // const bHeight = yMax / data[0].bins.length
    const colorMax = max(data, d => max(y(d), z))

    // scales
    const xScale = scaleLinear({
      range: [0, xMax],
      domain: extent(data, x)
    })
    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: [dMin, dMax]
    })
    const colorScale = scaleLinear({
      range: ['#77312f', '#f33d15'],
      domain: [0, colorMax]
    })
    // const colorScale2 = scaleLinear({
    //   range: ['#122549', '#b4fbde'],
    //   domain: [0, colorMax]
    // })
    const opacityScale = scaleLinear({
      range: [0.1, 1],
      domain: [0, colorMax]
    })

    return (
      <div>
        <svg width={this.props.width} height={this.props.height}>
          <Group top={this.props.margin.top} left={5}>
            <HeatmapCircle
              data={data}
              xScale={xScale}
              yScale={yScale}
              colorScale={colorScale}
              opacityScale={opacityScale}
              radius={(bWidth + 4) / 2}
              step={dStep}
              gap={4}
              onClick={data => event => {
                alert(`clicked: ${JSON.stringify(data.bin)}`)
              }}
            />
          </Group>
        </svg>
      </div>
    )
  }
}

export default HeatmapChart

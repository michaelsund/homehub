// @flow

import React from 'react'
import { AreaClosed, Line, Bar } from '@vx/shape'
import { curveMonotoneX } from '@vx/curve'
import { GradientPinkBlue } from '@vx/gradient'
import { scaleTime, scaleLinear } from '@vx/scale'
import { withTooltip, Tooltip } from '@vx/tooltip'
import { localPoint } from '@vx/event'
import { extent, max, bisector } from 'd3-array'
import { timeFormat } from 'd3-time-format'

type Props = {
  data: Array,
  width: number,
  height: number,
  margin: Object,
  showTooltip: Function,
  hideTooltip: any,
  tooltipData: any,
  tooltipTop: any,
  tooltipLeft: any,
  events: any,
}

type State = {
  data: Array
}

const formatDate = timeFormat("%b %d, '%y")
const xStock = d => new Date(d.date)
const yStock = d => d.close
const bisectDate = bisector(d => new Date(d.date)).left


class LineChart extends React.Component<Props, State> {
  state = {
    data: []
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.data.length) {
      this.setState({ data: nextProps.data })
    }
  }

  handleTooltip = ({
    event, data, xStock, xScale, yScale
  }) => {
    const { showTooltip } = this.props
    const { x } = localPoint(event)
    const x0 = xScale.invert(x)
    const index = bisectDate(data, x0, 1)
    const d0 = data[index - 1]
    const d1 = data[index]
    let d = d0
    if (d1 && d1.date) {
      d = x0 - xStock(d0.date) > xStock(d1.date) - x0 ? d1 : d0
    }
    showTooltip({
      tooltipData: d,
      tooltipLeft: x,
      tooltipTop: yScale(d.close),
    })
  }

  render() {
    const {
      width,
      height,
      hideTooltip,
      tooltipData,
      tooltipTop,
      tooltipLeft
    } = this.props
    if (width < 10) return null

    // bounds
    const xMax = this.props.width - this.props.margin.left - this.props.margin.right
    const yMax = this.props.height - this.props.margin.top - this.props.margin.bottom

    // scales
    const xScale = scaleTime({
      range: [0, xMax],
      domain: extent(this.state.data, xStock),
    })
    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: [0, max(this.state.data, yStock) + (yMax / 3)],
      nice: true
    })

    return (
      <div>
        <svg className="chart-svg" ref={s => this.svg = s} width={this.props.width} height={this.props.height}>
          <GradientPinkBlue id="gradient" />
          <AreaClosed
            data={this.state.data}
            xScale={xScale}
            yScale={yScale}
            x={xStock}
            y={yStock}
            strokeWidth={1}
            stroke={'url(#gradient)'}
            fill={'url(#gradient)'}
            curve={curveMonotoneX}
          />
          <Bar
            x={0}
            y={0}
            width={width}
            height={height}
            fill="transparent"
            rx={14}
            data={this.state.data}
            onTouchStart={data => event =>
              this.handleTooltip({
                event,
                data,
                xStock,
                xScale,
                yScale,
              })}
            onTouchMove={data => event =>
              this.handleTooltip({
                event,
                data,
                xStock,
                xScale,
                yScale,
              })}
            onMouseMove={data => event =>
              this.handleTooltip({
                event,
                data,
                xStock,
                xScale,
                yScale,
              })}
              onMouseLeave={data => event => hideTooltip()}
          />
          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: 0 }}
                to={{ x: tooltipLeft, y: yMax }}
                stroke="rgba(92, 119, 235, 1.000)"
                strokeWidth={2}
                style={{ pointerEvents: 'none' }}
                strokeDasharray="2,2"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop + 1}
                r={4}
                fill="black"
                fillOpacity={0.1}
                stroke="black"
                strokeOpacity={0.1}
                strokeWidth={2}
                style={{ pointerEvents: 'none' }}
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4}
                fill="rgba(92, 119, 235, 1.000)"
                stroke="white"
                strokeWidth={2}
                style={{ pointerEvents: 'none' }}
              />
            </g>
          )}
        </svg>
        {tooltipData && (
          <div>
            <Tooltip
              top={tooltipTop - 12}
              left={tooltipLeft - 28}
              style={{
                backgroundColor: 'rgba(92, 119, 235, 1.000)',
                color: 'white',
              }}
            >
              {`$${yStock(tooltipData)}`}
            </Tooltip>
            <Tooltip
              top={yMax - 14}
              left={tooltipLeft}
              style={{
                transform: 'translateX(-50%)',
              }}
            >
              {formatDate(xStock(tooltipData))}
            </Tooltip>
          </div>
        )}
      </div>
    )
  }
}

export default withTooltip(LineChart)

import * as React from 'react'
import { ParentSize } from '@vx/responsive'
import './BitCoinValue.css'
import LineChart from '../LineChart'

class BitCoinValue extends React.Component<> {
  render() {
    return (
      <div className="col-wrapper generic-wrapper">
        <ParentSize>
          {parent => (
            <LineChart
              width={parent.width}
              height={parent.height}
              margin={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
              }}
            />
          )}
        </ParentSize>
      </div>
    )
  }
}

export default BitCoinValue

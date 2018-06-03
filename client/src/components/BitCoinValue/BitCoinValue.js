// @flow

import * as React from 'react'
import { ParentSize } from '@vx/responsive'
import { appleStock } from '@vx/mock-data'
import './BitCoinValue.css'
import LineChart from '../LineChart'

type State = {
  myData: Array
}

class BitCoinValue extends React.Component<{}, State> {
  state = {
    data: []
  }

  componentDidMount = () => {
    setTimeout(() => {
      console.log('setting new data i BitCoin component')
      const someData = appleStock.slice(800)
      this.setState({ data: someData })
      console.log()
      console.log(this.state.data)
    }, 3000)
    setTimeout(() => {
      console.log('setting new data i BitCoin component')
      const newData = this.state.data.splice(0, Math.floor(this.state.data.length / 2))
      console.log(newData.length)
      this.setState({ data: newData })
    }, 5000)
  }

  render() {
    return (
      <div className="col-wrapper generic-wrapper">
        {this.state.data.length > 0 &&
          <p>Current: {this.state.data[this.state.data.length - 1].close}</p>}
        <div className="graph-container">
          <ParentSize>
            {parent => (
              <LineChart
                data={this.state.data}
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
      </div>
    )
  }
}

export default BitCoinValue

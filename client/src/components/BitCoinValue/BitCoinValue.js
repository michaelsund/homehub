// @flow

import * as React from 'react'
import { ParentSize } from '@vx/responsive'
import Moment from 'moment'
import './BitCoinValue.css'
import LineChart from '../LineChart'

type State = {
  data: Array,
  latestValue: number,
  lastUpdated: string
}

class BitCoinValue extends React.Component<{}, State> {
  state = {
    data: [],
    latestValue: null,
    lasteUpdate: ''
  }

  componentDidMount = () => {
    // Get historical data
    fetch('https://api.coindesk.com/v1/bpi/historical/close.json')
      .then(res => res.json())
      .then(res => Object.keys(res.bpi).map(key =>
        ({ date: key, close: Math.round(res.bpi[key]) })
      ))
      .then(newArr => this.setState({ data: newArr }))

    // Get latest current
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(res => res.json())
      .then(res => this.setState({
        latestValue: Math.round(res.bpi.USD.rate_float),
        lastUpdated: Moment(new Date(res.time.updatedISO)).format('YY-MM-DD HH:mm')
      }))
    // setTimeout(() => {
    //   console.log('setting new data i BitCoin component')
    //   const someData = appleStock.slice(800)
    //   this.setState({ data: someData })
    //   console.log()
    //   console.log(this.state.data)
    // }, 3000)
    // setTimeout(() => {
    //   console.log('setting new data i BitCoin component')
    //   const newData = this.state.data.splice(0, Math.floor(this.state.data.length / 2))
    //   console.log(newData.length)
    //   this.setState({ data: newData })
    // }, 5000)
  }

  render() {
    return (
      <div className="col-wrapper generic-wrapper">
        <p>{this.state.lastUpdated} ${this.state.latestValue}</p>
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

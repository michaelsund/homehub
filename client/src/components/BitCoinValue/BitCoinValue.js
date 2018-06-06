// @flow

import * as React from 'react'
import { ParentSize } from '@vx/responsive'
import Moment from 'moment'
import './BitCoinValue.css'
import LineChart from '../LineChart'
import Loading from '../Loading'

type State = {
  loading: boolean,
  data: Array,
  latestValue: number,
  lastUpdated: string
}

class BitCoinValue extends React.Component<{}, State> {
  state = {
    loading: true,
    data: [],
    latestValue: null,
    lasteUpdate: ''
  }

  componentDidMount = () => {
    // Get historical data
    this.getHistoricalValue()
    setTimeout(() => {
      this.getHistoricalValue()
    }, 14400000)

    // Get latest current
    this.getCurrentValue()
    setTimeout(() => {
      this.getCurrentValue()
    }, 3600000)
  }

  getHistoricalValue = () => {
    fetch('https://api.coindesk.com/v1/bpi/historical/close.json')
      .then(res => res.json())
      .then(res => Object.keys(res.bpi).map(key =>
        ({ date: key, close: Math.round(res.bpi[key]) })))
      .then(newArr => {
        this.setState({ data: newArr, loading: false })
      })
  }

  getCurrentValue = () => {
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(res => res.json())
      .then(res => this.setState({
        latestValue: Math.round(res.bpi.USD.rate_float),
        lastUpdated: Moment(new Date(res.time.updatedISO)).format('MM/DD HH:mm')
      }))
  }

  render() {
    return (
      <div className="col-wrapper generic-wrapper">
        <p>Bitcoin ${this.state.latestValue} @ {this.state.lastUpdated}</p>
        <div className="bitcoin-graph-container">
          {this.state.loading ? (
            <Loading />
          ) : (
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
          )}
        </div>
      </div>
    )
  }
}

export default BitCoinValue

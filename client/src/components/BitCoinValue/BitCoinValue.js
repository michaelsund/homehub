import * as React from 'react'
import { Row } from 'reactstrap'
import './BitCoinValue.css'
import LineChart from '../LineChart'

class BitCoinValue extends React.Component<> {
  render() {
    return (
      <div className="col-wrapper generic-wrapper">
        <Row>
          <p>BitCoins</p>
          <LineChart />
        </Row>
      </div>
    )
  }
}

export default BitCoinValue

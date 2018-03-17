// @flow

import React from 'react'
import { connect } from 'react-redux'
import './Sensor.css'
// import Loading from '../Loading'

type Props = {
  sensorId: string,
  sensorValues: []
}

type State = {
  sensor: Object,
  percentage: number,
  sensorValues: []
}

const mapStateToProps = state => state

class Sensor extends React.Component<Props, State> {
  state = {
    sensor: {},
    percentage: 0,
    sensorValues: []
  }

  componentDidMount = () => {
    // Initial fetch of sensor
    this.fetchSensorAndValues(this.props.sensorId)
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.sensorValues[0] && nextProps.sensorValues[0].sensorId === this.props.sensorId) {
      const nextSensorValue = nextProps.sensorValues[0]
      const sensor = { ...this.state.sensor }
      sensor.lastReportedValue = nextProps.sensorValues[0].value
      sensor.lastReportedTime = nextProps.sensorValues[0].time
      this.setState({
        sensor,
        sensorValues: [nextSensorValue, ...this.state.sensorValues]
      })
    }
  }

  fetchSensorAndValues = () => {
    console.log(`fetching sensor and values for ${this.props.sensorId}`)
    fetch('http://localhost:8080/api/sensor', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sensorId: this.props.sensorId
      })
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          sensor: response.sensor,
          percentage: this.calcPercentageValue(
            response.sensor.lastReportedValue,
            response.sensor.minValue,
            response.sensor.maxValue
          )
        })
      })

    fetch('http://localhost:8080/api/sensorvalues', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sensorId: this.props.sensorId
      })
    })
      .then(response => response.json())
      .then(response => {
        this.setState({ sensorValues: response.data })
      })
  }

  // TODO: Needs to handle values larger or smaller than min/max
  calcPercentageValue = (current, min, max) => Math.round(((current - min) * 100) / (max - min))

  render() {
    return (
      <div className="sensor-wrapper">
        <p>name: {this.state.sensor.name}</p>
        <p>desc: {this.state.sensor.description}</p>
        <p>lastRawValue: {this.state.sensor.lastReportedValue}</p>
        <p>lastTime: {this.state.sensor.lastReportedTime}</p>
        <h4>{this.state.percentage}</h4>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(Sensor)

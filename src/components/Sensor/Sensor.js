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
  sensorValues: []
}

const mapStateToProps = state => state

class Sensor extends React.Component<Props, State> {
  state = {
    sensor: {},
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
        this.setState({ sensor: response.sensor })
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

  render() {
    return (
      <div className="sensor-wrapper">
        <p>name: {this.state.sensor.name}</p>
        <p>desc: {this.state.sensor.description}</p>
        <p>type: {this.state.sensor.measurementType}</p>
        <p>
          lastValue: {this.state.sensor.lastReportedValue} min: {this.state.sensor.minValue}
          --max: {this.state.sensor.maxValue}
        </p>
        {/* TODO: Needs to handle values larger or smaller than min/max */}
        {/* <p>
          calcValue: {Math.round(((this.state.sensor.lastReportedValue -
          this.state.sensor.minValue) * 100) /
          (this.state.sensor.maxValue - this.state.sensor.minValue))}
          {this.state.sensor.measurementUnit}
        </p> */}
        <p>lastTime: {this.state.sensor.lastReportedTime}</p>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(Sensor)

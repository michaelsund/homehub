// @flow

import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import './Sensor.css'

type Props = {
  sensorId: string,
  sensors: [],
  onSetSensors: Function
}

type State = {
  sensor: Object
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
  onSetSensors: sensor => dispatch(actions.setSensors(sensor))
})

class Sensor extends React.Component<Props, State> {
  state = {
    sensor: {}
  }

  componentDidMount = () => {
    this.fetchSensor(this.props.sensorId)
  }

  componentWillReceiveProps = nextProps => {
    console.log(nextProps)
    // if (nextProps.sensors.length !== 0) {
    //   const [componentsSensor]: {} = new Promise(resolve =>
    //     resolve(nextProps.sensors.filter(sensor =>
    //       sensor._id === this.props.sensorId)))
    //   console.log(componentsSensor)
    //   this.setState({
    //     sensor: componentsSensor
    //   })
    // }
  }

  fetchSensor = () => {
    console.log(`fetching sensor ${this.props.sensorId}`)
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
        this.props.onSetSensors(response.sensor)
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
        <p>
          calcValue: {Math.round(((this.state.sensor.lastReportedValue -
          this.state.sensor.minValue) * 100) /
          (this.state.sensor.maxValue - this.state.sensor.minValue))}
          {this.state.sensor.measurementUnit}
        </p>
        <p>lastTime: {this.state.sensor.lastReportedTime}</p>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sensor)

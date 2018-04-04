// @flow

import React from 'react'
import { connect } from 'react-redux'
import Moment from 'moment'
import { Row, Col } from 'react-simple-flex-grid'
import './Sensor.css'
import Volume from '../Volume'
import VerticalProgress from '../VerticalProgress'
// import Loading from '../Loading'

type Props = {
  sensorId: string,
  sensorValues: []
}

type State = {
  errorFetchingData: bool,
  sensor: Object,
  percentage: number,
  sensorValues: []
}

const mapStateToProps = state => state

class Sensor extends React.Component<Props, State> {
  state = {
    errorFetchingData: false,
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
        sensorValues: [nextSensorValue, ...this.state.sensorValues],
        percentage: this.calcPercentageValue(
          nextProps.sensorValues[0].value,
          this.state.sensor.minValue,
          this.state.sensor.maxValue
        )
      })
    }
  }

  fetchSensorAndValues = () => {
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
          errorFetchingData: false,
          sensor: response.sensor,
          percentage: this.calcPercentageValue(
            response.sensor.lastReportedValue,
            response.sensor.minValue,
            response.sensor.maxValue
          )
        })
        this.fetchValues()
      })
      .catch(() => this.setState({ errorFetchingData: true }))
  }

  fetchValues = () => {
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
  calcPercentageValue = (current, min, max) => {
    const percent = Math.round(((current - min) * 100) / (max - min))
    if (percent < 0) {
      return 0
    } else if (percent > 100) {
      return 100
    }
    return percent
  }

  sensorRenderer = type => {
    if (type === 'volume') {
      return (
        <div className="generic-wrapper">
          <Row>
            <Col className="left-container" span={8}>
              <p className="name">{this.state.sensor.name}</p>
              <p className="desc">{this.state.sensor.description}</p>
              <p>{Moment(this.state.sensor.lastReportedTime).format('MM-DD HH:mm:ss')}</p>
            </Col>
            <Col className="right-container" span={2} offset={2}>
              <VerticalProgress
                value={this.state.percentage}
                bgColor="#1C1B1B"
              />
            </Col>
          </Row>
          <div className="bottom-container">
            <Volume value={this.state.percentage} unit={this.state.sensor.measurementUnit} />
          </div>
        </div>
      )
    }
    // Default if type is not defined
    return (
      <div className="generic-wrapper">
        <div className="text-container">
          <p className="name">{this.state.sensor.name}</p>
          <p className="desc">{this.state.sensor.description}</p>
          <p>Last raw value: {this.state.sensor.lastReportedValue}</p>
          <p>{Moment(this.state.sensor.lastReportedTime).format('MM-DD HH:mm:ss')}</p>
          <p>No sensortype defined</p>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="col-wrapper">
        {this.state.errorFetchingData ? (
          <div>
            <p>Error fetching sensor data!</p>
            <p>sensorId: {this.props.sensorId}</p>
          </div>
        ) : (
          this.sensorRenderer(this.state.sensor.measurementType)
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(Sensor)

// @flow

import React from 'react'
import Moment from 'moment'
import { Row, Col } from 'react-simple-flex-grid'
import './Sensor.css'
import VerticalProgress from '../VerticalProgress'
import SensorAlarm from '../SensorAlarm'

type Props = {
  sensorId: string,
  sensorValues?: Array,
  sensor: Object
}

type State = {
  errorFetchingData: boolean,
  percentage: number,
}

class Sensor extends React.Component<Props, State> {
  state = {
    errorFetchingData: false,
    percentage: 0
  }

  componentDidMount = () => {
    this.setState({
      percentage: this.calcPercentageValue(
        this.props.sensor.lastReportedValue,
        this.props.sensor.minValue,
        this.props.sensor.maxValue
      )
    })
  }

  // Gets sensorValues updates from redux, which is updated by websockets.
  componentWillReceiveProps = nextProps => {
    if (nextProps.sensor._id === this.props.sensor._id) {
      this.setState({
        percentage: this.calcPercentageValue(
          nextProps.sensor.lastReportedValue,
          this.props.sensor.minValue,
          this.props.sensor.maxValue
        )
      })
    }
  }

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
        <div>
          <Row>
            <Col className="left-container" span={8}>
              <p className="name">{this.props.sensor.name}</p>
              <p className="desc">{this.props.sensor.description}</p>
              <p>{Moment(new Date(this.props.sensor.lastReportedTime)).format('MM-DD HH:mm:ss')}</p>
            </Col>
            <Col className="right-container" span={2} offset={2}>
              <VerticalProgress
                value={this.state.percentage}
                bgColor="#1C1B1B"
              />
            </Col>
          </Row>
          <div className="bottom-container">
            <div className="bottom-container_left">
            {this.props.sensor.maxValueAlarm ||
                this.props.sensor.minValueAlarm ||
                this.props.sensor.maxAgeAlarm ?
                <SensorAlarm
                  sensor={this.props.sensor}
                /> : null
              }
            </div>
            <div className="bottom-container_right">
              <p className="value-text_big">{this.state.percentage}%</p>
            </div>
          </div>
        </div>
      )
    } else if (type === 'temperature') {
      return (
        <div>
          <Row>
            <Col className="left-container" span={8}>
              <p className="name">{this.props.sensor.name}</p>
              <p className="desc">{this.props.sensor.description}</p>
              <p>{Moment(new Date(this.props.sensor.lastReportedTime)).format('MM-DD HH:mm:ss')}</p>
            </Col>
            <Col className="right-container" span={2} offset={2}>
              {/* <VerticalProgress
                value={this.props.percentage}
                bgColor="#1C1B1B"
              /> */}
            </Col>
          </Row>
          <div className="bottom-container">
            <div className="bottom-container_left">
              {this.props.sensor.maxValueAlarm ||
                this.props.sensor.minValueAlarm ||
                this.props.sensor.maxAgeAlarm ?
                <SensorAlarm
                  sensor={this.props.sensor}
                /> : null
              }
            </div>
            <div className="bottom-container_right">
              <p className="value-text_big">{this.props.sensor.lastReportedValue}{this.props.sensor.measurementUnit}</p>
            </div>
          </div>
        </div>
      )
    }
    // Default if type is not defined
    return (
      <div className="text-container">
        <p className="name">{this.props.sensor.name}</p>
        <p className="desc">{this.props.sensor.description}</p>
        <p>Last raw value: {this.props.sensor.lastReportedValue}</p>
        <p>{Moment(new Date(this.props.sensor.lastReportedTime)).format('MM-DD HH:mm:ss')}</p>
        <p>No sensortype defined</p>
      </div>
    )
  }

  render() {
    return (
      <div className="col-wrapper fixed-height">
        {this.state.errorFetchingData ? (
          <div>
            <p>Error fetching sensor data!</p>
            <p>sensorId: {this.props.sensor._id}</p>
          </div>
        ) : (
          this.sensorRenderer(this.props.sensor.measurementType)
        )}
      </div>
    )
  }
}

export default Sensor

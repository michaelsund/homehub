// @flow

import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-simple-flex-grid'
import * as actions from '../../actions'
import Sensor from '../Sensor'
import './SensorList.css'

type Props = {
  sensors: [],
  onSetSensors: Function
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
  onSetSensors: sensors => dispatch(actions.setSensors(sensors))
})

class SensorList extends React.Component<Props> {
  componentDidMount = () => {
    // Initial fetch of List
    if (this.props.sensors.length === 0) {
      this.fetchAllSensors()
    }
  }

  fetchAllSensors = () => {
    fetch('http://localhost:8080/api/sensors', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(response => {
        this.props.onSetSensors(response.sensors)
      })
  }

  render() {
    return (
      this.props.sensors.length > 0 ? (
        <Row className="row-style" gutter={10}>
          {this.props.sensors.map(sensor => (
            <Col key={sensor._id} lg={2} md={2} sm={4} xs={12}>
              <Sensor sensorId={sensor._id} />
            </Col>
          ))}
        </Row>
      ) : (
        null
      )
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SensorList)

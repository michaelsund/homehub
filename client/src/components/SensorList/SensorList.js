// @flow

import React from 'react'
import { connect } from 'react-redux'
import {
  graphql,
  compose
} from 'react-apollo'
import { Col } from 'react-simple-flex-grid'
import * as actions from '../../actions'
import queries from '../../graphql/queries'
import Sensor from '../Sensor'
import './SensorList.css'

type Props = {
  data: Object,
  sensors: [],
  onSetSensors: Function
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
  onSetSensors: sensors => dispatch(actions.setSensors(sensors))
})

class SensorList extends React.Component<Props> {
  componentWillReceiveProps = nextProps => {
    if (nextProps.sensors.length === 0 && nextProps.data.sensors) {
      this.props.onSetSensors(nextProps.data.sensors)
    }
  }

  render() {
    return (
      this.props.sensors.length > 0 ? (
        this.props.sensors.map(sensor => (
          <Col className="col-without-row-style" key={sensor._id} lg={2} md={3} sm={3} xs={12}>
            <Sensor sensor={sensor} />
          </Col>
        ))
      ) : (
        this.props.data.loading ? (
          <p>Loading...</p>
        ) : (
          this.props.data.error !== undefined ? (
            <p>Error contacting server...</p>
          ) : (
            null
          )
        )
      )
    )
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(SensorList)
export default compose(
  graphql(queries.getSensors),
  connect(mapStateToProps, mapDispatchToProps)
)(SensorList)

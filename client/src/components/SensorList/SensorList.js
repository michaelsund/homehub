// @flow

import React from 'react'
import { graphql } from 'react-apollo'
import { Col } from 'react-simple-flex-grid'
import queries from '../../graphql/queries'
import subscriptions from '../../graphql/subscriptions'
import Sensor from '../Sensor'
import './SensorList.css'
import Loading from '../Loading'

type Props = {
  data: Array
}

class SensorList extends React.Component<Props> {
  componentDidMount = () => {
    this.sensorsUpdatedSubscription()
  }

  sensorsUpdatedSubscription = () => {
    this.props.data.subscribeToMore({
      document: subscriptions.sensorsUpdated,
    })
  }

  render() {
    return (
      this.props.data.loading ? (
        <Loading />
      ) : (
        this.props.data.sensors.map(sensor => (
          <Col className="col-without-row-style" key={sensor._id} lg={2} md={3} sm={3} xs={12}>
            <Sensor sensor={sensor} />
          </Col>
        ))
      )
    )
  }
}

export default graphql(queries.getSensors)(SensorList)

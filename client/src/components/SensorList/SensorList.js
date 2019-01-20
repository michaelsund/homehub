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

type State = {
  sensors: Array
}

class SensorList extends React.Component<Props, State> {
  componentDidMount = () => {
    this.sensorsUpdatedSubscription()
  }

  componentWillReceiveProps = nextProps => {
    this.setState({ sensors: nextProps.data.sensors })
  }

  sensorsUpdatedSubscription = () => {
    this.props.data.subscribeToMore({
      document: subscriptions.sensorsUpdated,
      updateQuery: (previous, { subscriptionData }) => {
        this.setState({ sensors: subscriptionData.data.sensorsUpdated })
      }
    })
  }

  render() {
    return (
      this.props.data.loading ? (
        <Loading />
      ) : (
        this.state.sensors ? (
          this.state.sensors.map(sensor => (
            <Col className="col-without-row-style" key={sensor._id} lg={2} md={3} sm={3} xs={12}>
              <Sensor sensor={sensor} />
            </Col>
          ))
        ) : null
      )
    )
  }
}

export default graphql(queries.getSensors)(SensorList)

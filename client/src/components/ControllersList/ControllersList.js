// @flow

import React from 'react'
import { graphql } from 'react-apollo'
import { Col } from 'react-simple-flex-grid'
import queries from '../../graphql/queries'
import subscriptions from '../../graphql/subscriptions'
import Controller from '../Controller'
import './ControllersList.css'
import Loading from '../Loading'

type Props = {
  data: Object
}

class ControllersList extends React.Component<Props> {
  componentDidMount = () => {
    this.controllersChangeSubscription()
  }

  controllersChangeSubscription = () => {
    this.props.data.subscribeToMore({
      document: subscriptions.controllersUpdated,
      // updateQuery: (previous, { subscriptionData }) => {
      //   console.log(subscriptionData)
      //  }
    })
  }

  render() {
    return (
      this.props.data.loading ? (
        <Loading />
      ) : (
        this.props.data.controllers.map(controller => (
          <Col
            className="col-without-row-style"
            key={controller._id}
            lg={2}
            md={3}
            sm={3}
            xs={12}
          >
            <Controller
              controller={controller}
            />
          </Col>
        ))
      )
    )
  }
}

export default graphql(queries.getControllers)(ControllersList)

// @flow

import React from 'react'
import { graphql } from 'react-apollo'
// import { Col } from 'react-simple-flex-grid'
import queries from '../../graphql/queries'
import subscriptions from '../../graphql/subscriptions'
// import Controller from '../Controller'
import './ControllersList.css'
// import Loading from '../Loading'

type Props = {
  data: Object,
  controllers: []
}

class ControllersList extends React.Component<Props> {
  componentDidMount = () => {
    this.controllerChangeSubscription()
  }

  componentWillReceiveProps = nextProps => {
    console.log(nextProps)
  }

  controllerChangeSubscription = () => {
    this.props.data.subscribeToMore({
      document: subscriptions.controllerUpdated,
      updateQuery: (previous, { subscriptionData }) => {
        console.log(subscriptionData)
      }
    })
  }

  render() {
    return (
      // <button onClick={() => this.props.data.refetch()}>Refetch</button>,
      // this.props.controllers.length > 0 ? (
      //   this.props.controllers.map(controller => (
      //    <Col
      //      className="col-without-row-style"
      //      key={controller._id}
      //      lg={2}
      //      md={3}
      //      sm={3}
      //      xs={12}
      //    >
      //       <Controller
      //         controller={controller}
      //       />
      //     </Col>
      //   ))
      // ) : (
      //   this.props.data.loading ? (
      //     <Loading />
      //   ) : (
      //     this.props.data.error !== undefined ? (
      //       <p>Error contacting server...</p>
      //     ) : (
      //       null
      //     )
      //   )
      // )
      <p>ControllerList</p>
    )
  }
}

export default graphql(queries.getControllers)(ControllersList)

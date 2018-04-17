// @flow

import React from 'react'
import { connect } from 'react-redux'
import {
  graphql,
  compose
} from 'react-apollo'
import { Col } from 'react-simple-flex-grid'
import * as actions from '../../actions'
import queries from '../../graphql'
import Controller from '../Controller'
import './ControllersList.css'

type Props = {
  data: Object,
  controllers: [],
  onSetControllers: Function
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
  onSetControllers: controllers => dispatch(actions.setControllers(controllers))
})

class ControllersList extends React.Component<Props> {
  componentWillReceiveProps = nextProps => {
    console.log(nextProps)
    if (nextProps.data.controllers) {
      this.props.onSetControllers(nextProps.data.controllers)
    }
  }

  render() {
    return (
      <button onClick={() => this.props.data.refetch()}>Refetch</button>,
      this.props.controllers.length > 0 ? (
        this.props.controllers.map(controller => (
          <Col className="col-without-row-style" key={controller._id} lg={2} md={3} sm={3} xs={12}>
            <Controller
              controller={controller}
            />
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

export default compose(
  graphql(queries.getControllers),
  connect(mapStateToProps, mapDispatchToProps)
)(ControllersList)

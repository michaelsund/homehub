// @flow

import React from 'react'
import Moment from 'moment'
import { connect } from 'react-redux'
import { Row, Col } from 'react-simple-flex-grid'
import { Mutation } from 'react-apollo'
import mutations from '../../graphql/mutations'
import * as actions from '../../actions'
import './Controller.css'

type Props = {
  controller: Object,
  onToggleController: Function
}

const mapDispatchToProps = dispatch => ({
  onToggleController: controllerId => dispatch(actions.toggleController(controllerId))
})

class Controller extends React.Component<Props> {
  handleToggleClicked = () => {
    this.props.onToggleController(this.props.controller._id)
  }

  render() {
    return (
      <Mutation mutation={mutations.toggleController}>
        {(toggleController, { data }) => (
          <div className="col-wrapper">
            <div className="generic-wrapper">
              <Row>
                <Col className="left-container" span={8}>
                  <p className="name">{this.props.controller.name}</p>
                  <p className="desc">{this.props.controller.description}</p>
                  {this.props.controller.lastReportedTime !== null &&
                    <p>{Moment(new Date(this.props.controller.lastReportedTime)).format('MM-DD HH:mm:ss')}</p>
                  }
                </Col>
                <Col className="right-container" span={2} offset={2}>
                </Col>
              </Row>
              <div className="bottom-container">
                <div className="bottom-container_left">
                  <button onClick={() =>
                    // this.handleToggleClicked()
                    toggleController({ variables: { id: this.props.controller._id } })
                  }>
                    Toggle
                  </button>
                </div>
                <div className="bottom-container_right">
                  {this.props.controller.status ? <h2>ON</h2> : <h2>OFF</h2>}
                </div>
              </div>
            </div>
          </div>
        )}
      </Mutation>
    )
  }
}

export default connect(null, mapDispatchToProps)(Controller)

import React from 'react'
import { Row, Col } from 'react-simple-flex-grid'
import { Mutation } from 'react-apollo'
import mutations from '../../graphql/mutations'
import './Controller.css'

type Props = {
  controller: Object
}

class Controller extends React.Component<Props> {
  render() {
    return (
      <Mutation mutation={mutations.toggleController}>
        {/* Used to be toggleController, { data } */}
        {toggleController => (
          <div className="col-wrapper">
            <Row>
              <Col className="left-container" span={8}>
                <p className="name">{this.props.controller.name}</p>
                <p className="desc">{this.props.controller.description}</p>
                {this.props.controller.timer
                  && <div>
                        <p>On: {this.props.controller.onTime}</p>
                        <p>Off: {this.props.controller.offTime}</p>
                      </div>
                }
              </Col>
              <Col className="right-container" span={2} offset={2}>
              </Col>
            </Row>
            <div className="bottom-container">
              <div className="bottom-container_left">
                <button onClick={() => {
                  toggleController({ variables: { id: this.props.controller._id } })
                }}>
                  Toggle
                </button>
              </div>
              <div className="bottom-container_right">
                {this.props.controller.status ? <h2>ON</h2> : <h2>OFF</h2>}
              </div>
            </div>
          </div>
        )}
      </Mutation>
    )
  }
}

export default Controller

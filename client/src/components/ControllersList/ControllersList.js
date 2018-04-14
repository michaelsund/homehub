// @flow

import React from 'react'
import { graphql } from 'react-apollo'
import queries from '../../graphql'
import './ControllersList.css'

type Props = {
  data: Object
}

class ControllersList extends React.Component<Props> {
  componentDidMount = () => {
    console.log(this.props.data)
  }

  componentWillReceiveProps = nextProps => {
    console.log(nextProps.data)
  }

  render() {
    return (
      <div>
      <p>GraphQL data from mockserver.</p>
      { this.props.data.error !== undefined ? (
          <p>Error contacting server...</p>
        ) : (
          this.props.data.loading ? (
            <p>Loading...</p>
          ) : (
            <div>
                {this.props.data.controllers.map(controller =>
                  <p key={controller._id}>{controller.name}</p>)}
            </div>
          )
        )
      }
      <button onClick={() => this.props.data.refetch()}>Refetch</button>
    </div>
    )
  }
}

export default graphql(queries.getControllers)(ControllersList)

import React from 'react'
import { graphql } from 'react-apollo'
import queries from '../../graphql/queries'
import subscriptions from '../../graphql/subscriptions'
import Loading from '../Loading'
import './ControllerStatus.css'

type Props = {
  data: Object
}

class ControllerStatus extends React.Component<Props> {
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

  controllerStatusIconColor = status => status ? 'status-icon_online' : 'status-icon_offline'

  render() {
    return (
      <div className="col-wrapper cuStatus-container">
        {this.props.data.loading ? (
          <Loading />
        ) : (
          this.props.data ? (
            <ul className="list-dot_hidden">
              {this.props.data.controllers.map(controller => (
                <li className={`status-icon ${this.controllerStatusIconColor(controller.status)}`} key={controller.name}>
                  <span>{controller.name} </span>
                  <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, .25)' }}>{controller.description}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Problem getting data</p>
          )
        )}
      </div>
    )
  }
}

export default graphql(queries.getControllers)(ControllerStatus)

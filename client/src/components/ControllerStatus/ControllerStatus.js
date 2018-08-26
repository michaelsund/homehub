import React from 'react'
import { graphql, Mutation } from 'react-apollo'
import queries from '../../graphql/queries'
import mutations from '../../graphql/mutations'
import subscriptions from '../../graphql/subscriptions'
import Loading from '../Loading'
import './ControllerStatus.css'

type Props = {
  data: Object
}

type State = {
  controllers: Array
}

class ControllerStatus extends React.Component<Props, State> {
  state = {
    controllers: []
  }

  componentDidMount = () => {
    this.controllersChangeSubscription()
  }

  componentWillReceiveProps = nextProps => {
    this.setState({ controllers: nextProps.data.controllers })
  }

  controllersChangeSubscription = () => {
    this.props.data.subscribeToMore({
      document: subscriptions.controllersUpdated,
      updateQuery: (previous, { subscriptionData }) => {
        console.log(subscriptionData)
        this.setState({ controllers: subscriptionData.data.controllersUpdated })
      }
    })
  }

  controllerStatusIconColor = status => status ? 'status-icon_online' : 'status-icon_offline'

  render() {
    return (
      <div className="col-wrapper cuStatus-container">
        {this.props.data.loading ? (
          <Loading />
        ) : (
          this.state.controllers ? (
            <ul className="list-dot_hidden">
              {this.state.controllers.map(controller => (
                <Mutation mutation={mutations.toggleController} key={controller.name}>
                  {toggleController => (
                    <li
                      onClick={() => {
                        toggleController({ variables: { id: controller._id } })
                      }}
                      className={`status-icon ${this.controllerStatusIconColor(controller.status)}`}
                    >
                      <span>{controller.name} </span>
                      <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, .25)' }}>{controller.description}</span>
                    </li>
                  )}
                </Mutation>
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

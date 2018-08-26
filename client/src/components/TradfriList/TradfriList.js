// @flow

import React from 'react'
import { graphql, Mutation } from 'react-apollo'
import queries from '../../graphql/queries'
import subscriptions from '../../graphql/subscriptions'
import mutations from '../../graphql/mutations'
import './TradfriList.css'
import Loading from '../Loading'
// import TradfriBulbgroup from '../TradfriBulbgroup'

type Props = {
  data: Object
}

type State = {
  bulbGroups: Array
}

class TradfriList extends React.Component<Props, State> {
  state = {
    bulbGroups: []
  }

  componentDidMount = () => {
    this.tradfriBulbgroupUpdatedSubscription()
  }

  componentWillReceiveProps = nextProps => {
    this.setState({ bulbGroups: nextProps.data.bulbgroups })
  }

  tradfriBulbgroupUpdatedSubscription = () => {
    this.props.data.subscribeToMore({
      document: subscriptions.tradfriBulbgroupUpdated,
      updateQuery: (previous, { subscriptionData }) => {
        this.setState({ bulbGroups: subscriptionData.data.tradfriUpdated })
      }
    })
  }

  bulbIconColor = status => status ? 'status-icon_on' : 'status-icon_off'

  render() {
    return (
      this.props.data.loading ? (
        <Loading />
      ) : (
        <div className="col-wrapper bulblist-container">
          {this.state.bulbGroups ? (
            this.state.bulbGroups.map(group =>
              <Mutation key={group.instanceId} mutation={mutations.toggleTradfriGroup}>
                {toggleTradfriGroup => (
                  <React.Fragment>
                    <p
                      className="bulblist-grupname"
                      onClick={() => {
                        toggleTradfriGroup({
                          variables: {
                            instanceid: group.instanceId,
                            onoff: !group.status
                          }
                        })
                      }}
                    >
                      {group.name}
                    </p>
                    <ul className="list-dot_hidden">
                      {group.bulbs.map(b => (
                      <li
                        key={b.instanceId}
                        className={`status-icon ${this.bulbIconColor(b.status)}`}
                      >
                        <span>{b.name}</span>
                      </li>))}
                    </ul>
                  </React.Fragment>)}
              </Mutation>)
          ) : <p>No bulbs found</p>}
        </div>
      )
    )
  }
}

export default graphql(queries.getBulbgroups)(TradfriList)

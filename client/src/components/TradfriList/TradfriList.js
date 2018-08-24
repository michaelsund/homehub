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

class TradfriList extends React.Component<Props> {
  componentDidMount = () => {
    this.tradfriUpdatedSubscription()
  }

  // shouldComponentUpdate = nextProps => {
  //   if (nextProps !== this.props) {
  //     return true
  //   }
  //   return false
  // }

  tradfriUpdatedSubscription = () => {
    this.props.data.subscribeToMore({
      document: subscriptions.tradfriUpdated,
      updateQuery: (previous, { subscriptionData }) => {
        console.log(subscriptionData)
      }
    })
  }

  componentWillReceiveProps = nextProps => {
    console.log(nextProps)
  }

  bulbIconColor = status => status ? 'status-icon_on' : 'status-icon_off'

  render() {
    return (
      this.props.data.loading ? (
        <Loading />
      ) : (
        <div className="col-wrapper bulblist-container">
          {this.props.data.bulbgroups ? (
            this.props.data.bulbgroups.map(group =>
              <Mutation key={group.instanceId} mutation={mutations.toggleTradfriGroup}>
                {toggleTradfriGroup => (
                  <React.Fragment>
                    <p onClick={() => {
                      toggleTradfriGroup({
                        variables: {
                          instanceid: group.instanceId,
                          onoff: false
                        }
                      })
                    }}>
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

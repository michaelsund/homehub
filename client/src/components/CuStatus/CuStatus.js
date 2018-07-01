import React from 'react'
import { graphql } from 'react-apollo'
import queries from '../../graphql/queries'
import { cuClient } from '../../graphql/gqlClients'
import CuPlayerCount from './CuPlayerCount'
import Loading from '../Loading'
import './CuStatus.css'

type Props = {
  data: Object
}

type State = {
  servers: Array
}

class CuStatus extends React.Component<Props, State> {
  state = {
    servers: []
  }

  componentWillReceiveProps = nextProps => {
    const sortedServers = [].concat(nextProps.data.connectedServices.servers)
      .sort(s => s === 'Offline')
    this.setState({ servers: sortedServers })
  }

  serverStatusIconColor = status => status === 'Online' ? 'status-icon_online' : 'status-icon_offline'

  render() {
    return (
      <div className="col-wrapper cuStatus-container">
        {this.props.data.loading ? (
          <Loading />
        ) : (
          this.props.data ? (
            <ul className="list-dot_hidden">
              {this.state.servers.map(server => (
                <li className={`status-icon ${this.serverStatusIconColor(server.status)}`} key={server.name}>
                  <span>{server.name} </span>
                  <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, .25)' }}>{server.accessLevel}</span>
                  {server.status === 'Online' && <CuPlayerCount serverName={server.name} />}
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

export default graphql(queries.getCuServerStatus, {
  options: {
    client: cuClient,
    pollInterval: 60000
  }
})(CuStatus)

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

class CuStatus extends React.Component<Props> {
  playerCountRef = React.createRef()
  componentWillUpdate = () => {
    // this.playerCountRef.current.refetchPlayerCount()
  }

  serverStatusIconColor = status => status === 'Online' ? 'status-icon_online' : 'status-icon_offline'

  render() {
    return (
      <div className="col-wrapper generic-wrapper cuStatus-container">
        {this.props.data.loading ? (
          <Loading />
        ) : (
          this.props.data ? (
            <ul className="list-dot_hidden">
              {this.props.data.connectedServices.servers.map(server => (
                <li className={`status-icon ${this.serverStatusIconColor(server.status)}`} key={server.name}>
                  {server.name}<CuPlayerCount serverName={server.name} />
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

// export default graphql(queries.getCuServerStatus)(CuStatus)
export default graphql(queries.getCuServerStatus, {
  options: {
    client: cuClient,
    pollInterval: 300000
  }
})(CuStatus)

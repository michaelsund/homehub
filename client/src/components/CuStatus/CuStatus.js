import React from 'react'
import { graphql } from 'react-apollo'
import queries from '../../graphql/queries'
import { cuClient } from '../../graphql/gqlClients'
import Loading from '../Loading'
import './CuStatus.css'

type Props = {
  data: Object
}

class CuStatus extends React.Component<Props> {
  componentDidMount = () => {
    // Reftech every 5 minutes
    setInterval(() => {
      console.log('Refetching CU server status..')
      this.props.data.refetch()
    }, 300000)
  }

  serverStatusIconColor = status => status === 'Online' ? 'status-icon_online' : 'status-icon_offline'

  render() {
    return (
      <div className="col-wrapper generic-wrapper">
        <div className="serverstatus-graph-container">
          {this.props.data.loading ? (
            <Loading />
          ) : (
            this.props.data ? (
              <div className="cuStatus-container">
                <ul className="list-dot_hidden">
                  {this.props.data.connectedServices.servers.map(server => (
                    <li className={`status-icon ${this.serverStatusIconColor(server.status)}`} key={server.name}>
                      {server.name}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>Problem getting data</p>
            )
          )}
        </div>
      </div>
    )
  }
}

// export default graphql(queries.getCuServerStatus)(CuStatus)
export default graphql(queries.getCuServerStatus, {
  options: {
    client: cuClient
  }
})(CuStatus)

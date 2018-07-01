import * as React from 'react'
import { graphql } from 'react-apollo'
import queries from '../../graphql/queries'
import subscriptions from '../../graphql/subscriptions'
import './ServerStatus.css'
import Loading from '../Loading'
import SvgCircle from '../SvgCircle'

type Props = {
  data: Object
}

class ServerStatus extends React.Component<Props> {
  componentDidMount = () => {
    this.serversChangeSubscription()
  }

  serversChangeSubscription = () => {
    this.props.data.subscribeToMore({
      document: subscriptions.serversChanged
    })
  }

  renderIconFromStatus = server => server.status ?
    <SvgCircle color="#18D8F0" width={44} height={44} />
    : <SvgCircle color="#FF1493" width={44} height={44} />

  render() {
    return (
      <div className="col-wrapper">
        <div className="serverstatus-graph-container">
          {this.props.data.loading ? (
            <Loading />
          ) : (
            <div className="serverStatus-container">
              {this.props.data.servers.map(server => (
                <div className="tooltip" key={server._id}>
                  <div className="serverStatus-item">
                    {this.renderIconFromStatus(server)}
                  </div>
                  <span className="tooltiptext">
                    <div>
                      <p>{server.serverName}</p>
                      <p>ip: {server.serverIp}</p>
                      <p>port: {server.port}</p>
                      <p>{server.statusMessage}</p>
                    </div>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
}

// export default graphql(queries.getServers)(ServerStatus)
export default graphql(queries.getServers)(ServerStatus)

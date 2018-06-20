import * as React from 'react'
import { graphql } from 'react-apollo'
import Modal from 'react-responsive-modal'
import queries from '../../graphql/queries'
import subscriptions from '../../graphql/subscriptions'
import './ServerStatus.css'
import Loading from '../Loading'
import SvgRect from '../SvgRect'

type Props = {
  data: Object
}

type State = {
  loading: boolean,
  data: Array,
  modalOpen: boolean,
  currentDisplayedServer: Object
}

class ServerStatus extends React.Component<Props, State> {
  state = {
    modalOpen: false,
    currentDisplayedServer: {}
  }

  componentDidMount = () => {
    // this.serversChangeSubscription()
  }

  serversChangeSubscription = () => {
    this.props.data.subscribeToMore({
      document: subscriptions.serversUpdated
    })
  }

  onCloseModal = () => {
    this.setState({ modalOpen: false, currentDisplayedServer: {} })
  }

  showServerModal = server => {
    this.setState({ modalOpen: true, currentDisplayedServer: server })
  }

  renderIconFromStatus = server => server.status ?
    <SvgRect color="#18D8F0" width={40} height={40} />
    : <SvgRect color="#FF1493" width={40} height={40} />

  render() {
    return (
      <div className="col-wrapper generic-wrapper">
        <div className="serverstatus-graph-container">
          {this.props.data.loading ? (
            <Loading />
          ) : (
            <div className="serverStatus-container">
              {this.props.data.servers.map(server => (
                <div
                  className="serverStatus-item"
                  key={server.serverName}
                  onClick={() => this.showServerModal(server)}
                >
                  {this.renderIconFromStatus(server)}
                </div>
              ))}
            </div>
          )}
        </div>
        <Modal
          classNames={{ overlay: 'custom-overlay', modal: 'custom-modal' }}
          open={this.state.modalOpen}
          onClose={this.onCloseModal}
          showCloseIcon={false}
          center
        >
          <ul>
            <li>{this.state.currentDisplayedServer.serverName}</li>
            <li>{this.state.currentDisplayedServer.serverType}</li>
            <li>{this.state.currentDisplayedServer.serverIp}</li>
            <li>{JSON.stringify(this.state.currentDisplayedServer.status)}</li>
          </ul>
          <button className="btn" onClick={() => this.onCloseModal()}>
            <span>Close</span>
          </button>
        </Modal>
      </div>
    )
  }
}

export default graphql(queries.getServers)(ServerStatus)

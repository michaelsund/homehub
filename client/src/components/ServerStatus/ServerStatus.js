import * as React from 'react'
import Modal from 'react-responsive-modal'
import './ServerStatus.css'
import Loading from '../Loading'
import SvgRect from '../SvgRect'

type State = {
  loading: boolean,
  data: Array,
  modalOpen: boolean,
  currentDisplayedServer: Object
}

// const mockData = [
//   { serverName: 'frink', status: false }
// ]

class ServerStatus extends React.Component<{}, State> {
  state = {
    loading: false,
    data: [
      {
        serverName: 'Server 1', serverType: 'fileserver', status: true, ports: [80, 443]
      },
      {
        serverName: 'Server 2', serverType: 'fileserver', status: true, ports: [80, 443]
      },
      {
        serverName: 'Server 3', serverType: 'fileserver', status: false, ports: [80, 443]
      },
      {
        serverName: 'Server 4', serverType: 'fileserver', status: true, ports: [80, 443]
      },
      {
        serverName: 'Server 5', serverType: 'fileserver', status: false, ports: [80, 443]
      },
      {
        serverName: 'Server 6', serverType: 'fileserver', status: true, ports: [80, 443]
      },
      {
        serverName: 'Server 7', serverType: 'fileserver', status: true, ports: [80, 443]
      }
    ],
    modalOpen: false,
    currentDisplayedServer: {}
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
          {this.state.loading ? (
            <Loading />
          ) : (
            <div className="serverStatus-container">
              {this.state.data.map(server => (
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
          </ul>
          <button className="btn" onClick={() => this.onCloseModal()}>
            <span>Close</span>
          </button>
        </Modal>
      </div>
    )
  }
}

export default ServerStatus

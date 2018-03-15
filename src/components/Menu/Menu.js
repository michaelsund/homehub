// @flow

import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import {
  FaTh,
  FaTelevision
} from 'react-icons/lib/fa'
import './Menu.css'

type Props = {
  location: Object,
  onSocketConnect: Function,
  sockets: Object
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
  onSocketConnect: () => dispatch({ type: 'CONNECT' })
})

class Menu extends React.Component<Props> {
  componentDidMount = () => {
    // Reconnect the socket if disconnected
    if (!this.props.sockets.connected) {
      this.props.onSocketConnect()
    }
  }

  isActive = route => route === this.props.location.pathname ?
    'nav-link-active' : 'nav-link'

  render() {
    return (
      <div className="icon-bar">
        <Link to="/" className={this.isActive('/')}>
          <FaTelevision />
        </Link>
        <Link to="/about" className={this.isActive('/about')}>
          <FaTh />
        </Link>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu))

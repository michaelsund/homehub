// @flow

import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import {
  GoDashboard,
  GoGear
} from 'react-icons/lib/go'
import './Menu.css'

type Props = {
  location: Object
}

class Menu extends React.Component<Props> {
  isActive = route => route === this.props.location.pathname ?
    'nav-link-active' : 'nav-link'

  render() {
    return (
      <div className="icon-bar">
        <Link to="/" className={this.isActive('/')}>
          <GoDashboard />
        </Link>
        <Link to="/settings" className={this.isActive('/settings')}>
          <GoGear />
        </Link>
      </div>
    )
  }
}

export default withRouter(Menu)

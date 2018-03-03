// @flow

import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import {
  FaTh,
  FaTelevision
} from 'react-icons/lib/fa'
import './Menu.css'

type Props = {
  location: Object
}

class Menu extends React.Component<Props> {
  isActive = (route) => route === this.props.location.pathname ?
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

export default withRouter(Menu)

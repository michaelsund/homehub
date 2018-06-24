// @flow

import React from 'react'
import {
  GoChevronRight,
  GoChevronLeft
} from 'react-icons/lib/go'
import './Sidebar.css'
import Menu from '../Menu'

type State = {
  open: boolean
}

class Sidebar extends React.Component<{}, State> {
  state = {
    open: false
  }

  toggleMenu = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    return (
      <div>
        <input type="checkbox" id="slide" value="" onChange={() => this.toggleMenu()} />
        <div className="container-sidebar">
          <label htmlFor="slide" className="toggle toggle-grow">
            {this.state.open ? <GoChevronLeft /> : <GoChevronRight />}
          </label>
          <nav className="sidebar">
            <Menu />
          </nav>
        </div>
      </div>
    )
  }
}

export default Sidebar

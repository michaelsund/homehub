import React from 'react'
import {
  GoChevronRight,
  GoChevronLeft
} from 'react-icons/go'
import './Sidebar.css'
import Menu from '../Menu'

type State = {
  open: boolean
}

class Sidebar extends React.Component<{}, State> {
  state = {
    open: false
  }

  compRef = React.createRef()

  componentWillMount = () => {
    document.addEventListener('mousedown', this.handleClick)
  }

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.handleClick)
  }

  handleClick = e => {
    // Handle clicking outside, hiding sidebar
    if (!this.compRef.current.contains(e.target)) {
      this.setState({ open: false })
    }
  }

  toggleMenu = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    return (
      <div ref={this.compRef}>
        <input type="checkbox" id="slide" checked={this.state.open} value="" onChange={() => this.toggleMenu()} />
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

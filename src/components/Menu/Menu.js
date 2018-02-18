import React from 'react'
import { Link } from 'react-router-dom'
import FaTh from 'react-icons/lib/fa/th'
import FaTelevision from 'react-icons/lib/fa/television'
import './Menu.css'

const Menu = () => (
  <div className="icon-bar">
    <Link to="/">
      <FaTelevision />
    </Link>
    <Link to="/about">
      <FaTh />
    </Link>
  </div>
)

export default Menu

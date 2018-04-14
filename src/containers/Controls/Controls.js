// @flow

import React from 'react'
import { Row } from 'react-simple-flex-grid'
import 'react-simple-flex-grid/lib/main.css'
import ControllerList from '../../components/ControllerList'

class Controls extends React.Component<{}> {
  render() {
    return (
      <Row className="row-style">
        {/* Controllers fetched from db */}
        <ControllerList />
      </Row>
    )
  }
}

export default Controls

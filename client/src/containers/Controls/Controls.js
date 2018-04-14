// @flow

import React from 'react'
import { Row } from 'react-simple-flex-grid'
import 'react-simple-flex-grid/lib/main.css'
import ControllersList from '../../components/ControllersList'

class Controls extends React.Component<{}> {
  render() {
    return (
      <Row className="row-style">
        {/* Controllers fetched from db via graphql */}
        <ControllersList />
      </Row>
    )
  }
}

export default Controls

// @flow

import React from 'react'
import { Row, Col } from 'react-simple-flex-grid'
import 'react-simple-flex-grid/lib/main.css'
import RecurringEvent from '../../components/RecurringEvent'
import SensorList from '../../components/SensorList'


class App extends React.Component<{}> {
  render() {
    return (
      <div>
        <Row className="row-style" gutter={10}>
          {/* Recurring events are hardcoded */}
          <Col lg={2} md={2} sm={6} xs={6}>
            <RecurringEvent
              title="Pannan"
              note="Tömma aska"
              eventInterval="thu"
            />
          </Col>
        </Row>
        {/* Sensors fetched from db */}
        <SensorList />
      </div>
    )
  }
}

export default App

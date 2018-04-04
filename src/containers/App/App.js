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
        {/* Sensors fetched from db */}
        <SensorList />
        <Row className="row-style" gutter={10}>
          {/* Recurring events are hardcoded */}
          <Col lg={2} md={2} sm={4} xs={12}>
            <RecurringEvent
              title="Pannan"
              note="Tömma aska"
              everyWeek
              eventDay="fri"
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default App

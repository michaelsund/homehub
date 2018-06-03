// @flow

import React from 'react'
import { Row, Col } from 'react-simple-flex-grid'
import 'react-simple-flex-grid/lib/main.css'
import BitCoinValue from '../../components/BitCoinValue'
import RecurringEvent from '../../components/RecurringEvent'
import SensorList from '../../components/SensorList'

class App extends React.Component<{}> {
  render() {
    return (
      <Row className="row-style">
        <Col className="col-without-row-style" lg={4} md={3} sm={3} xs={12}>
          <BitCoinValue />
        </Col>
        {/* Sensors fetched from db */}
        <SensorList />
        {/* Recurring events are hardcoded */}
        <Col className="col-without-row-style" lg={2} md={3} sm={3} xs={12}>
          <RecurringEvent
            title="Sophämtning"
            note="Ställ ut kärl"
            everyWeek={false}
            evenWeeks
            eventDay="fri"
          />
        </Col>
        <Col className="col-without-row-style" lg={2} md={3} sm={3} xs={12}>
          <RecurringEvent
            title="Luftvärmepump"
            note="Dammsug filter"
            everyWeek
            eventDay="sat"
          />
        </Col>
        <Col className="col-without-row-style" lg={2} md={3} sm={3} xs={12}>
          <RecurringEvent
            title="Pannan"
            note="Aska ur"
            everyWeek
            eventDay="thu"
          />
        </Col>
      </Row>
    )
  }
}

export default App

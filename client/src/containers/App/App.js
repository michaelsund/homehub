// @flow

import React from 'react'
import { Row, Col } from 'react-simple-flex-grid'
import 'react-simple-flex-grid/lib/main.css'
import BitCoinValue from '../../components/BitCoinValue'
import RecurringEvent from '../../components/RecurringEvent'
import SensorList from '../../components/SensorList'
import ServerStatus from '../../components/ServerStatus'
import CuStatus from '../../components/CuStatus'
import SonarrCalendar from '../../components/SonarrCalendar'
import VideoStream from '../../components/VideoStream'

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
        <Col className="col-without-row-style" lg={3} md={4} sm={5} xs={12}>
          <ServerStatus />
        </Col>
        <Col className="col-without-row-style" lg={3} md={4} sm={5} xs={12}>
          <CuStatus />
        </Col>
        <Col className="col-without-row-style" lg={3} md={4} sm={5} xs={12}>
          <SonarrCalendar updateInterval={5} daysForward={3} />
        </Col>
        <Col className="col-without-row-style" lg={3} md={4} sm={5} xs={12}>
          <VideoStream />
        </Col>
      </Row>
    )
  }
}

export default App

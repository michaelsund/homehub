// @flow
import * as React from 'react'
import { GoAlert } from 'react-icons/lib/go'
import './SensorAlarm.css'

type Props = {
  maxValueAlarmActive: boolean,
  minValueAlarmActive: boolean,
  maxAgeAlarmActive: boolean
}

class Alarm extends React.Component<Props> {
  handleAlarmAck = () => {
    console.log(`status:
    maxValueAlarmActive: ${this.props.maxValueAlarmActive}
    minValueAlarmActive: ${this.props.minValueAlarmActive}
    maxAgeAlarmActive: ${this.props.maxAgeAlarmActive}
    `)
  }

  render() {
    return (
      this.props.maxAgeAlarmActive ? <GoAlert className="sensor-alarm-icon" onClick={this.handleAlarmAck} /> : null
    )
  }
}

export default Alarm

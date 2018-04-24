// @flow
import * as React from 'react'
import { GoAlert } from 'react-icons/lib/go'
import './Alarm.css'

type Props = {
  sensor: Object
}

type State = {
  isActive: Boolean
}

class Alarm extends React.Component<Props> {
  state = {
    isActive: false
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.sensor.maxValueAlarmActive ||
      nextProps.sensor.minValueAlarmActive ||
      nextProps.sensor.maxAgeAlarmActive) {
      this.setState({ isActive: true })
    } else {
      this.setState({ isActive: false })
    }
  }

  handleAlarmAck = () => {
    console.log(`status:
    maxValueAlarmActive: ${this.props.sensor.maxValueAlarmActive}
    minValueAlarmActive: ${this.props.sensor.minValueAlarmActive}
    maxAgeAlarmActive: ${this.props.sensor.maxAgeAlarmActive}
    `)
  }

  render() {
    return (
      this.state.isActive ? <GoAlert className="alarm-icon_inactive" onClick={this.handleAlarmAck} /> : null
    )
  }
}

export default Alarm

// @flow
import * as React from 'react'
import { GoAlert } from 'react-icons/lib/go'
import Modal from 'react-responsive-modal'
import './SensorAlarm.css'

type Props = {
  sensor: Object
}

type State = {
  modalOpen: boolean
}

class Alarm extends React.Component<Props, State> {
  state = {
    modalOpen: false
  }

  onOpenModal = () => {
    this.setState({ modalOpen: true })
  }

  onCloseModal = () => {
    this.setState({ modalOpen: false });
  };

  onAlarmAck = () => {
    fetch('/api/acksensoralarm', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ sensorId: this.props.sensor._id })
    })
      .then(() => {
        this.setState({ modalOpen: false })
      })
  }

  render() {
    return (
      (this.props.sensor.maxAgeAlarmActive ||
      this.props.sensor.maxValueAlarmActive ||
      this.props.sensor.minValueAlarmActive) && (
        <div>
          <GoAlert className="sensor-alarm-icon" onClick={this.onOpenModal} />
          <Modal
            classNames={{ overlay: 'custom-overlay', modal: 'custom-modal' }}
            open={this.state.modalOpen}
            onClose={this.onCloseModal}
            center
          >
            <h2>Alarms for {this.props.sensor.name}</h2>
            <ul>
              {this.props.sensor.maxAgeAlarmActive && <li>data max age reached.</li>}
              {this.props.sensor.maxValueAlarmActive && <li>sensor exceeded the maximum value.</li>}
              {this.props.sensor.minValueAlarmActive && <li>sensor exceeded the minimum value.</li>}
            </ul>
            <button className="btn" onClick={this.onAlarmAck}>
              <span>Acknowledge</span>
            </button>
          </Modal>
        </div>
      )
    )
  }
}

export default Alarm

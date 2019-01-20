import * as React from 'react'
import { GoAlert } from 'react-icons/go'
import Modal from 'react-responsive-modal'
import { Mutation } from 'react-apollo'
import mutations from '../../graphql/mutations'
import './SensorAlarm.css'

type Props = {
  sensor: Object
}

type State = {
  modalOpen: boolean
}

class SensorAlarm extends React.Component<Props, State> {
  state = {
    modalOpen: false
  }

  onOpenModal = () => {
    this.setState({ modalOpen: true })
  }

  onCloseModal = () => {
    this.setState({ modalOpen: false })
  }

  render() {
    return (
      <Mutation mutation={mutations.ackSensorAlarm}>
        {/* Used to be toggleController, { data } */}
        {ackSensorAlarm => (
          this.props.sensor.maxAgeAlarmActive
          || this.props.sensor.maxValueAlarmActive
          || this.props.sensor.minValueAlarmActive) && (
            <div>
              <GoAlert className="sensor-alarm-icon" onClick={this.onOpenModal} />
              <Modal
                classNames={{ overlay: 'custom-overlay', modal: 'custom-modal' }}
                open={this.state.modalOpen}
                onClose={this.onCloseModal}
                showCloseIcon={false}
                center
              >
                <h2>Alarms for {this.props.sensor.name}</h2>
                <ul>
                  {this.props.sensor.maxAgeAlarmActive
                    && <li>data max age reached.</li>
                  }
                  {this.props.sensor.maxValueAlarmActive
                    && <li>sensor exceeded the maximum value.</li>
                  }
                  {this.props.sensor.minValueAlarmActive
                    && <li>sensor exceeded the minimum value.</li>
                  }
                </ul>
                <button
                  className="btn"
                  onClick={() => {
                    ackSensorAlarm({ variables: { id: this.props.sensor._id } })
                    this.onCloseModal()
                  }}>
                  <span>Acknowledge</span>
                </button>
              </Modal>
            </div>)
        }
      </Mutation>
    )
  }
}

export default SensorAlarm

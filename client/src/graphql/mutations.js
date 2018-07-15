import gql from 'graphql-tag'

const toggleController = gql`
  mutation toggleController($id: ID!) {
    toggleController(id: $id) {
      _id
      name
      description
      status
      timer
      onTime
      offTime
      type
      lastReportedTime
      identificationId
      external
    }
  }
`

const ackSensorAlarm = gql`
  mutation ackSensorAlarm($id: ID!) {
    ackSensorAlarm(id: $id) {
      _id
      name
      description
      measurementType
      measurementUnit
      scaling
      identificationId
      external
      lastReportedValue
      lastReportedTime
      maxAgeMinutes
      maxAgeAlarm
      maxAgeAlarmActive
      maxAgeAlarmManualReset
      maxValueAlarm
      maxValueAlarmActive
      maxValue
      minValueAlarmActive
      minValue
    }
  }
`

export default {
  toggleController,
  ackSensorAlarm
}

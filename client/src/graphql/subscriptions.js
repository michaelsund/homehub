import gql from 'graphql-tag'

const controllersUpdated = gql`
  subscription controllersUpdated {
    controllersUpdated {
      _id
      name
      description
      identificationId
      status
      lastReportedTime
      timer
      onTime
      offTime
    }
  }
`

const sensorsUpdated = gql`
  subscription sensorsUpdated {
    sensorsUpdated {
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

const serversChanged = gql`
  subscription serversChanged {
    serversChanged {
      _id
      serverName
      serverType
      serverIp
      status
      statusMessage
      lastChecked
      port
    }
  }
`

export default {
  controllersUpdated,
  serversChanged,
  sensorsUpdated
}

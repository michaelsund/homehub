import gql from 'graphql-tag'

const getCuServerStatus = gql`
  query {
    connectedServices {
      servers {
        accessLevel
        name
        status
      }
    }
  }
`

const getCuPlayerCount = gql`
  query getCuPlayerCount($serverName: String!) {
    metrics {
      currentPlayerCount(server: $serverName) {
        arthurian
        tuatha
        viking
        total
      }
    }
  }
`

const getServers = gql`
  query getServers {
    servers {
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

const getControllers = gql`
  query getControllers {
    controllers {
      _id
      name
      description
      identificationId
      status
      lastReportedTime
      type
      groupName
      timer
      onTime
      offTime
    }
  }
`

const getSensors = gql`
  query getSensors {
    sensors {
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
  getControllers,
  getSensors,
  getServers,
  getCuServerStatus,
  getCuPlayerCount
}

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
  serversChanged
}

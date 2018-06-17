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

export default {
  controllersUpdated
}

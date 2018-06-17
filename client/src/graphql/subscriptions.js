import gql from 'graphql-tag'

const controllerUpdated = gql`
  subscription controllerUpdated {
    controllerUpdated {
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
  controllerUpdated
}

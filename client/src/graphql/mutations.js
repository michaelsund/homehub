import gql from 'graphql-tag'

const toggleController = gql`
  mutation toggle($id: ID!) {
    toggleController(id: $id) {
      _id
      name
      description
      status
      timer
      onTime
      offTime
      lastReportedTime
      identificationId
      external
    }
  }
`

export default {
  toggleController
}

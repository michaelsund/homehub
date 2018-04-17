import gql from 'graphql-tag'

const getControllers = gql`
  query getControllers {
    controllers {
      _id
      name
      description
      status
      lastReportedTime
    }
  }
`

export default {
  getControllers
}

import gql from 'graphql-tag'

const getControllers = gql`
  query getControllers {
    controllers {
      _id
      name
    }
  }
`

export default {
  getControllers
}

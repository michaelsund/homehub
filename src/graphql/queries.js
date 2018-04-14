import gql from 'graphql-tag'

const getControllers = gql`
  query getControllers {
    controllers {
      id
      name
    }
  }
`

export default {
  getControllers
}

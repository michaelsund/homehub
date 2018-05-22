import gql from 'graphql-tag'

const toggleController = gql`
  mutation toggle($id: ID!) {
    toggleController(id: $id) {
      result
      status
    }
  }
`

export default {
  toggleController
}

import {
  GraphQLObjectType,
  GraphQLBoolean,
} from 'graphql'

export default new GraphQLObjectType({
  name: 'ToggleControllerResponse',
  fields: {
    result: {
      type: GraphQLBoolean
    },
    status: {
      type: GraphQLBoolean
    }
  }
})

import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString
} from 'graphql'

export default new GraphQLObjectType({
  name: 'LearnControllerResponse',
  fields: {
    result: {
      type: GraphQLBoolean
    },
    resultMessage: {
      type: GraphQLString
    }
  }
})

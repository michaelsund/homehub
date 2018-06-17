import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

export default new GraphQLObjectType({
  name: 'TestType',
  fields: {
    text: {
      type: GraphQLString
    }
  }
})

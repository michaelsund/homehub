import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID
} from 'graphql'

export default new GraphQLObjectType({
  name: 'Controller',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    external: {
      type: GraphQLBoolean
    },
    status: {
      type: GraphQLBoolean
    },
    lastReportedTime: {
      type: GraphQLString
    }
  }
})

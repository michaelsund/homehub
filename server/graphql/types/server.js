import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID
} from 'graphql'

export default new GraphQLObjectType({
  name: 'Server',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    serverName: {
      type: GraphQLString
    },
    serverType: {
      type: GraphQLString
    },
    serverIp: {
      type: GraphQLString
    },
    ports: {
      type: GraphQLFloat
    },
    status: {
      type: GraphQLBoolean
    },
    lastChecked: {
      type: GraphQLString
    }
  }
})

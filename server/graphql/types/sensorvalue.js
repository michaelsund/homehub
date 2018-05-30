import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLID
} from 'graphql'

export default new GraphQLObjectType({
  name: 'SensorValue',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    sensorId: {
      type: GraphQLString
    },
    value: {
      type: GraphQLFloat
    },
    time: {
      type: GraphQLString
    }
  }
})

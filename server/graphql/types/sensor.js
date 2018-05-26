import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLID,
  GraphQLFloat
} from 'graphql'

export default new GraphQLObjectType({
  name: 'Sensor',
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
    measurementType: {
      type: GraphQLString
    },
    measurementUnit: {
      type: GraphQLString
    },
    scaling: {
      type: GraphQLInt
    },
    identificationId: {
      type: GraphQLInt
    },
    external: {
      type: GraphQLBoolean
    },
    lastReportedValue: {
      type: GraphQLFloat
    },
    lastReportedTime: {
      type: GraphQLString
    },
    maxAgeMinutes: {
      type: GraphQLInt
    },
    maxAgeAlarm: {
      type: GraphQLBoolean
    },
    maxAgeAlarmActive: {
      type: GraphQLBoolean
    },
    maxAgeAlarmManualReset: {
      type: GraphQLBoolean
    },
    maxValueAlarm: {
      type: GraphQLBoolean
    },
    maxValueAlarmActive: {
      type: GraphQLBoolean
    },
    maxValue: {
      type: GraphQLFloat
    },
    minValueAlarm: {
      type: GraphQLBoolean
    },
    minValueAlarmActive: {
      type: GraphQLBoolean
    },
    minValue: {
      type: GraphQLFloat
    }
  }
})

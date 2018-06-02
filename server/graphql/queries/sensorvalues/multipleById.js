import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} from 'graphql'

import sensorvalueType from '../../types/sensorvalue'
import getProjection from '../../get-projection'
import SensorValueModel from '../../../schema/SensorValueModel'

export default {
  description: 'Get a list of sensorvalues from a sensor id',
  type: new GraphQLList(sensorvalueType),
  args: {
    sensorId: {
      name: 'sensorId',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params, info, fieldASTs) {
    const projection = getProjection(fieldASTs)
    return SensorValueModel
      .find({ sensorId: params.sensorId })
      .select(projection)
      .sort({ time: 'desc' })
      .limit(10)
      .exec()
  }
}

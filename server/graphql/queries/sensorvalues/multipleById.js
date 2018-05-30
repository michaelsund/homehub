import {
  GraphQLString,
  GraphQLNonNull
} from 'graphql'

import sensorvalueType from '../../types/sensorvalue'
import getProjection from '../../get-projection'
import SensorValueModel from '../../../schema/SensorValueModel'

export default {
  description: 'Get a list of sensorvalues from a sensor id',
  type: sensorvalueType,
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
      .exec()
  }
}

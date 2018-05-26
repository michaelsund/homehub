import {
  GraphQLID,
  GraphQLNonNull
} from 'graphql'

import sensorType from '../../types/sensor'
import getProjection from '../../get-projection'
import SensorModel from '../../../schema/SensorModel'

export default {
  description: 'Get a single sensor by id',
  type: sensorType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(root, params, info, fieldASTs) {
    const projection = getProjection(fieldASTs)
    return SensorModel
      .findById(params.id)
      .select(projection)
      .exec()
  }
}

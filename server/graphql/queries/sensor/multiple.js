import { GraphQLList } from 'graphql'
import sensorType from '../../types/sensor'
import getProjection from '../../get-projection'
import SensorModel from '../../../schema/SensorModel'

export default {
  description: 'Get sensors in a list',
  type: new GraphQLList(sensorType),
  args: {},
  resolve(root, params, info, fieldASTs) {
    const projections = getProjection(fieldASTs)
    return SensorModel
      .find()
      .select(projections)
      .exec()
  }
}

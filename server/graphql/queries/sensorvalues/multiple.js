import { GraphQLList } from 'graphql'
import sensorvalueType from '../../types/sensorvalue'
import getProjection from '../../get-projection'
import SensorValueModel from '../../../schema/SensorValueModel'

export default {
  description: 'Get sensorvalues in a list',
  type: new GraphQLList(sensorvalueType),
  args: {},
  resolve(root, params, info, fieldASTs) {
    const projections = getProjection(fieldASTs)
    return SensorValueModel
      .find()
      .select(projections)
      .exec()
  }
}

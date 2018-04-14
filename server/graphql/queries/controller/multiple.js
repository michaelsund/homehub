import { GraphQLList } from 'graphql'
import controllerType from '../../types/controller'
import getProjection from '../../get-projection'
import ControllerModel from '../../../schema/ControllerModel'

export default {
  type: new GraphQLList(controllerType),
  args: {},
  resolve(root, params, info, fieldASTs) {
    const projections = getProjection(fieldASTs)
    return ControllerModel
      .find()
      .select(projections)
      .exec()
  }
}

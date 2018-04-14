import {
  GraphQLID,
  GraphQLNonNull
} from 'graphql'

import controllerType from '../../types/controller'
import getProjection from '../../get-projection'
import ControllerModel from '../../../schema/ControllerModel'

export default {
  type: controllerType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(root, params, info, fieldASTs) {
    const projection = getProjection(fieldASTs)
    return ControllerModel
      .findById(params.id)
      .select(projection)
      .exec()
  }
}

import {
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql'
import controllerType from '../../types/controller'
import ControllerModel from '../../../schema/ControllerModel'

export default {
  type: GraphQLBoolean,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(controllerType)
    }
  },
  // async resolve(root, params, options) {
  async resolve(root, params) {
    const controllerModel = new ControllerModel(params.data)
    const newController = await controllerModel.save()

    if (!newController) {
      throw new Error('Error adding new controller')
    }
    return true
  }
}

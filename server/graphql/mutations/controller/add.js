import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql'
// import controllerType from '../../types/controller'
import ControllerModel from '../../../schema/ControllerModel'

export default {
  description: 'Adds a controller',
  type: GraphQLBoolean,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) }
  },
  async resolve(root, args) {
    const controllerModel = new ControllerModel(args)
    const addController = await controllerModel.save()
    if (!addController) {
      return false
    }
    return true
  }
}
// args: {
//   name: { type: new GraphQLNonNull(GraphQLString) }
// },
// async resolve(root, params) {
//   const controllerModel = new ControllerModel(params.args)
//   const addController = await controllerModel.save()
//   if (!addController) {
//     console.log('Error adding new controller')
//     return false
//   }
//   return true
// }

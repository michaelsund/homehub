import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLBoolean,
} from 'graphql'
// import controllerType from '../../types/controller'
import ControllerModel from '../../../schema/ControllerModel'

export default {
  description: 'Adds a controller',
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  async resolve(root, args) {
    return ControllerModel.findById(args.id)
      .select()
      .exec()
      .then(c => {
        console.log(`toggling controller ${c.name}`)
        return true
      })
      .catch(() => {
        console.log('invalid controller id supplied')
        return false
      })
  }
}

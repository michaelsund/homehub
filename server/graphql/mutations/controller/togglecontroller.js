import {
  GraphQLNonNull,
  GraphQLID,
  // GraphQLBoolean,
} from 'graphql'
import ToggleControllerResponse from '../../types/toggleControllerResponse'
import telldusDeviceToggle from '../../../helpers/telldusDeviceToggle'

export default {
  description: 'Toggles a controller',
  type: ToggleControllerResponse,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(root, args) {
    return telldusDeviceToggle(args.id)
      .then(result => {
        console.log(result)
        return result
      })
  }
}

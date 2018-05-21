import {
  GraphQLNonNull,
  GraphQLID,
  // GraphQLBoolean,
} from 'graphql'
import ToggleControllerResponse from '../../types/toggleControllerResponse'
import telldusDeviceToggle from '../../../helpers/telldusDeviceToggle'
import settings from '../../../../client/src/settings.json'

export default {
  description: 'Toggles a controller',
  type: ToggleControllerResponse,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(root, args) {
    if (!settings.dev) {
      return telldusDeviceToggle(args.id)
        .then(result => {
          console.log(result)
          return result
        })
    }
    console.log('Returning mock controller result in dev mode.')
    return Object.assign({ result: false, status: false })
  }
}

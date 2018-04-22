import {
  GraphQLNonNull,
  GraphQLID,
  // GraphQLBoolean,
} from 'graphql'
import ControllerModel from '../../../schema/ControllerModel'
import ToggleControllerResponse from '../../types/toggleControllerResponse'
import config from '../../../settings.json'

if (config.telldusDuoConnected) {
  console.log(`duo: ${config.telldusDuoConnected}`)
  // eslint-disable-next-line
  const telldus = require('telldus')
}

export default {
  description: 'Adds a controller',
  type: ToggleControllerResponse,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  async resolve(root, args) {
    if (config.telldusDuoConnected) {
      return ControllerModel.findById(args.id)
        .select()
        .exec()
        .then(() => {
          // Try to toggle the telldus device here and return the result in status
          return Object.assign({ result: false, status: false })
        })
        .catch(() => Object.assign({ result: false, status: false }))
    }
    return Object.assign({ result: false, status: false })
  }
}

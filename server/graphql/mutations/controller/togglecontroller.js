import {
  GraphQLNonNull,
  GraphQLID,
  // GraphQLBoolean,
} from 'graphql'
import ControllerModel from '../../../schema/ControllerModel'
import ToggleControllerResponse from '../../types/toggleControllerResponse'
import settings from '../../../../client/src/settings.json'
import helpers from '../../../helpers'

if (!settings.dev) {
  // eslint-disable-next-line
  const telldus = require('telldus')
}

export default {
  description: 'Toggles a controller',
  type: ToggleControllerResponse,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(root, args) {
    if (settings.dev === false) {
      ControllerModel.findById(args.id, (err, controller) => {
        if (err) {
          console.log(err)
        } else {
          helpers.telldusDeviceStatus(controller.name)
            .then(res => console.log(`res: ${res}`))
            .catch(err => console.log(err))
        }
      })
      return Object.assign({ result: true, status: true })
    }
    console.log('In dev mode, returning mock result')
    return Object.assign({ result: false, status: false })
  }
}

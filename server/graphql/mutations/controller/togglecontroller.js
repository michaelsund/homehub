import {
  GraphQLNonNull,
  GraphQLID,
  // GraphQLBoolean,
} from 'graphql'
import ControllerResponse from '../../types/controller'
import telldusDeviceToggle from '../../../helpers/telldusDeviceToggle'
import settings from '../../../../client/src/settings.json'

export default {
  description: 'Toggles a controller status',
  type: ControllerResponse,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(root, args) {
    console.log(`received args: ${JSON.stringify(args, null, 2)}`)
    if (!settings.dev) {
      return telldusDeviceToggle(args.id)
        .then(result => {
          console.log(result)
          return result
        })
    }
    console.log('Returning mock controller result in dev mode.')
    return Object.assign({
      _id: new GraphQLID(123),
      name: 'Development controller',
      description: 'dev',
      external: false,
      status: false,
      lastReportedTime: '',
      timer: false,
      onTime: '',
      offTime: ''
    })
  }
}

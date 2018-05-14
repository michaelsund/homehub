import GraphQLString from 'graphql'
import ControllerModel from '../../../schema/ControllerModel'
import LearnControllerResponse from '../../types/learnControllerResponse'
import settings from '../../../../client/src/settings.json'

if (!settings.dev) {
  // eslint-disable-next-line
  const telldus = require('telldus')
}

export default {
  description: 'Learns a controller',
  type: LearnControllerResponse,
  args: {
    id: { type: new GraphQLString() }
  },
  async resolve(root, args) {
    if (settings.telldusDuoConnected) {
      return ControllerModel.findById(args.id)
        .select()
        .exec()
        .then(controller => {
          console.log(controller)
          if (!controller) {
            telldus.turnOff(controller.name, () => Object.assign({ result: true, resultMessage: `Device ${args.name} learned` }))
          } else {
            Object.assign({ result: false, resultMessage: 'Device name allready exists' })
          }
        })
        .catch(() => Object.assign({ result: false, status: false }))
    }
    return Object.assign({ result: false, status: false })
  }
}

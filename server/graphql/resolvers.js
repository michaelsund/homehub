import {
  pubsub,
  CONTROLLER_UPDATED_TOPIC,
  SERVERS_CHANGED_TOPIC
} from './pubsub'
import settings from '../../client/src/settings.json'
import telldusDeviceToggle from '../helpers/telldusDeviceToggle'
import ServerModel from '../schema/ServerModel'
import SensorModel from '../schema/SensorModel'
import ControllerModel from '../schema/ControllerModel'

export const resolvers = {
  Query: {
    servers: () => {
      const allServers = ServerModel.find({})
      pubsub.publish(SERVERS_CHANGED_TOPIC, { serversChanged: allServers })
      return allServers
    },
    server: (root, { id }) => ServerModel.findById(id),
    sensors: () => SensorModel.find({}),
    sensor: (root, { id }) => SensorModel.findById(id),
    controllers: () => ControllerModel.find({}),
    controller: (root, { id }) => ControllerModel.findById(id),
  },
  Mutation: {
    // addChannel: (root, args) => {
    //   const newChannel = { id: String(nextId += 1), messages: [], name: args.name }
    //   channels.push(newChannel)
    //   pubsub.publish(CHANNEL_ADDED_TOPIC, { channelAdded: newChannel })
    //   return newChannel
    // }
    toggleController: (root, args) => {
      if (!settings.dev) {
        return telldusDeviceToggle(args.id)
          .then(result => {
            console.log(result)
            pubsub.publish(CONTROLLER_UPDATED_TOPIC, { controllerUpdated: result })
            return result
          })
      }
      console.log('Returning mock controller result in dev mode.')
      const mockController = Object.assign({
        _id: '123',
        name: 'Development controller',
        description: 'dev',
        external: false,
        status: false,
        lastReportedTime: '',
        timer: false,
        onTime: '',
        offTime: ''
      })

      pubsub.publish(CONTROLLER_UPDATED_TOPIC, { controllerUpdated: mockController })

      return mockController
    }
  },
  Subscription: {
    serversChanged: {
      subscribe: () => pubsub.asyncIterator(SERVERS_CHANGED_TOPIC)
    },
    controllerUpdated: {
      subscribe: () => pubsub.asyncIterator(CONTROLLER_UPDATED_TOPIC)
    }
  }
}

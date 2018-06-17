import { PubSub } from 'graphql-subscriptions'
import ServerModel from '../schema/ServerModel'
import SensorModel from '../schema/SensorModel'
import ControllerModel from '../schema/ControllerModel'

const SERVERS_CHANGED_TOPIC = 'SERVERS_CHANGED'
const pubsub = new PubSub()

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
  // Mutation: {
  //   addChannel: (root, args) => {
  //     const newChannel = { id: String(nextId += 1), messages: [], name: args.name }
  //     channels.push(newChannel)
  //     pubsub.publish(CHANNEL_ADDED_TOPIC, { channelAdded: newChannel })
  //     return newChannel
  //   }
  // },
  Subscription: {
    serversChanged: {
      subscribe: () => pubsub.asyncIterator(SERVERS_CHANGED_TOPIC)
    }
  }
}

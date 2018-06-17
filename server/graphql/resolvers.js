import { PubSub } from 'graphql-subscriptions'
import ServerModel from '../schema/ServerModel'
import SensorModel from '../schema/SensorModel'

const SERVER_CHANGED_TOPIC = 'SERVER_CHANGED'
const pubsub = new PubSub()

export const resolvers = {
  Query: {
    servers: () => ServerModel.find({}),
    server: (root, { id }) => ServerModel.findById(id),
    sensors: () => SensorModel.find({}),
    sensor: (root, { id }) => SensorModel.findById(id),
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
    serverChanged: {
      subscribe: () => pubsub.asyncIterator(SERVER_CHANGED_TOPIC)
    }
  }
}

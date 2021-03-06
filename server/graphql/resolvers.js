import {
  pubsub,
  CONTROLLERS_UPDATED_TOPIC,
  SERVERS_CHANGED_TOPIC,
  SENSORS_UPDATED_TOPIC,
  TRADFRI_UPDATED_TOPIC
} from './pubsub'
import sensorsPubSub from '../helpers/sensorsPubSub'
import settings from '../../client/src/settings.json'
import telldusDeviceToggle from '../helpers/telldusDeviceToggle'
import ackSensorAlarms from '../helpers/ackSensorAlarms'
import {
  getBulbStore,
  toggleBulbOrGroup
} from '../helpers/tradfriHelpers'
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
    bulbgroups: () => getBulbStore()
  },
  Mutation: {
    toggleTradfriGroup: async (root, args) => {
      await toggleBulbOrGroup(args.instanceId, args.onOff)
      return { ...args }
    },
    toggleController: async (root, args) => {
      if (!settings.dev) {
        return telldusDeviceToggle(args.id)
          .then(result => result)
      }
      console.log(`DEV Toggling controller ${args.id}`)
      const unmodifiedControllerList = await ControllerModel.find({})
      const unmodifiedController = await ControllerModel.findById(args.id)
      pubsub.publish(CONTROLLERS_UPDATED_TOPIC, { controllersUpdated: unmodifiedControllerList })
      return unmodifiedController
    },
    ackSensorAlarm: async (root, args) => ackSensorAlarms(args.id)
      .then(updatedSensor => {
        sensorsPubSub()
        return updatedSensor
      })
  },
  Subscription: {
    serversChanged: {
      subscribe: () => pubsub.asyncIterator(SERVERS_CHANGED_TOPIC)
    },
    controllersUpdated: {
      subscribe: () => pubsub.asyncIterator(CONTROLLERS_UPDATED_TOPIC)
    },
    sensorsUpdated: {
      subscribe: () => pubsub.asyncIterator(SENSORS_UPDATED_TOPIC)
    },
    tradfriUpdated: {
      subscribe: () => pubsub.asyncIterator(TRADFRI_UPDATED_TOPIC)
    }
  }
}

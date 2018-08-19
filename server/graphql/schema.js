import { makeExecutableSchema } from 'graphql-tools'

import { resolvers } from './resolvers'

const typeDefs = `
  type Server {
    _id: ID!
    serverName: String
    serverType: String
    serverIp: String
    port: Float
    status: Boolean
    statusMessage: String
    lastChecked: String
  }

  type Sensor {
    _id: ID!
    name: String
    description: String
    measurementType: String
    measurementUnit: String
    scaling: Float
    identificationId: Float
    external: Boolean
    lastReportedValue: Float
    lastReportedTime: String
    maxAgeMinutes: Float
    maxAgeAlarm: Boolean
    maxAgeAlarmActive: Boolean
    maxAgeAlarmManualReset: Boolean
    maxValueAlarm: Boolean
    maxValueAlarmActive: Boolean
    maxValue: Float
    minValueAlarm: Boolean
    minValueAlarmActive: Boolean
    minValue: Float
  }

  type Controller {
    _id: ID!
    name: String
    description: String
    external: Boolean
    status: Boolean
    lastReportedTime: String
    identificationId: Float
    type: String
    groupName: String
    timer: Boolean
    onTime: String
    offTime: String
  }

  type BulbGroup {
    name: String
    instanceId: String
    bulbs: [Bulb]
  }

  type Bulb {
    name: String
    instanceId: String
    status: Boolean
    color: String
    dimmer: Float
  }

  type Query {
    servers: [Server]
    server(id: ID!): Server
    sensors: [Sensor]
    sensor(id: ID!): Sensor
    controllers: [Controller]
    controller(id: ID!): Controller
    bulbgroups: [BulbGroup]
  }

  type Mutation {
    toggleController(id: ID!): Controller
    ackSensorAlarm(id: ID!): Sensor
  }

  type Subscription {
      serversChanged: [Server],
      controllersUpdated: [Controller]
      sensorsUpdated: [Sensor]
  }
`

const schema = makeExecutableSchema({ typeDefs, resolvers })
export { schema }

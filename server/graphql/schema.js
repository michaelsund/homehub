import { makeExecutableSchema } from 'graphql-tools'

import { resolvers } from './resolvers'

const typeDefs = `
  type Channel {
    id: ID!
    name: String
  }

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
    timer: Boolean
    onTime: String
    offTime: String
  }

  type Query {
    servers: [Server]
    server(id: ID!): Server
    sensors: [Sensor]
    sensor(id: ID!): Sensor
    controllers: [Controller]
    controller(id: ID!): Controller
  }

  type Mutation {
    toggleController(id: ID!): Controller
  }

  type Subscription {
      serversChanged: [Server],
      controllersUpdated: [Controller]
  }
`

const schema = makeExecutableSchema({ typeDefs, resolvers })
export { schema }

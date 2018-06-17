import { makeExecutableSchema } from 'graphql-tools'

import { resolvers } from './resolvers'

const typeDefs = `
  type Channel {
    id: ID!                # "!" denotes a required field
    name: String
  }

  type Server {
    _id: ID!                # "!" denotes a required field
    serverName: String
    serverType: String
    serverIp: String
    port: Float
    status: Boolean
    lastChecked: String
  }

  type Sensor {
    _id: ID!                # "!" denotes a required field
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

  # This type specifies the entry points into our API
  type Query {
    servers: [Server]
    server(id: ID!): Server
    sensors: [Sensor]
    sensor(id: ID!): Sensor
  }

  # The mutation root type, used to define all mutations
  #type Mutation {
  #  addChannel(name: String!): Channel
  #}

  # The subscription root type, specifying what we can subscribe to
  type Subscription {
      serverChanged: Server
  }
`

const schema = makeExecutableSchema({ typeDefs, resolvers })
export { schema }

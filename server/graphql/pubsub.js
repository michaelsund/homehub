import { PubSub } from 'graphql-subscriptions'

export const SERVERS_CHANGED_TOPIC = 'SERVERS_CHANGED'
export const CONTROLLER_UPDATED_TOPIC = 'CONTROLLER_UPDATED'
export const pubsub = new PubSub()

import { PubSub } from 'graphql-subscriptions'

export const SERVERS_CHANGED_TOPIC = 'SERVERS_CHANGED'
export const CONTROLLERS_UPDATED_TOPIC = 'CONTROLLERS_UPDATED'
export const SENSORS_UPDATED_TOPIC = 'SENSORS_UPDATED'
export const TRADFRI_UPDATED_TOPIC = 'TRADFRI_UPDATED'
export const pubsub = new PubSub()

import { PubSub } from 'graphql-subscriptions'

export const pubSub = new PubSub()
export const TOPIC_SERVER_CHANGED = 'SERVER_CHANGED'

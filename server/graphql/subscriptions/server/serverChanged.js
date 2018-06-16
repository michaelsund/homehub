// import withFilter from 'graphql-subscriptions'
import {
  pubSub,
  TOPIC_SERVER_CHANGED,
} from '../../pubSub'
import serverType from '../../types/server'

// export default {
//   description: 'Server subscription',
//   type: serverType,
//   Subscription: {
//     serverChanged: {
//       subscribe: () => pubSub.asyncIterator(TOPIC_SERVER_CHANGED),
//     },
//   },
// }
export default {
  description: 'Server subscription',
  type: serverType,
  Subscription: {
    serverChanged: {
      subscribe: () => pubSub.asyncIterator(TOPIC_SERVER_CHANGED)
    }
  }
}

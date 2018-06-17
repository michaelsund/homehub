import {
  pubSub,
  TOPIC_SERVER_CHANGED,
} from '../../pubSub'
import testType from '../../types/testType'

export default {
  description: 'Server subscription',
  type: testType,
  Subscription: {
    serverChanged: {
      subscribe: () => pubSub.asyncIterator([TOPIC_SERVER_CHANGED])
    }
  }
}

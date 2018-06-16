import { GraphQLList } from 'graphql'
import serverType from '../../types/server'
import getProjection from '../../get-projection'
import ServerModel from '../../../schema/ServerModel'
import {
  pubSub,
  TOPIC_SERVER_CHANGED
} from '../../pubSub'

export default {
  description: 'Get servers in a list',
  type: new GraphQLList(serverType),
  args: {},
  resolve(root, params, info, fieldASTs) {
    const projections = getProjection(fieldASTs)
    const server = ServerModel
      .find()
      .select(projections)
      .exec()
    // Testing subs
    pubSub.publish(TOPIC_SERVER_CHANGED, {
      serverName: 'test subs'
    })
    return server
  }
}

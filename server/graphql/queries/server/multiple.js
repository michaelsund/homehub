import { GraphQLList } from 'graphql'
import serverType from '../../types/server'
import getProjection from '../../get-projection'
import ServerModel from '../../../schema/ServerModel'

export default {
  description: 'Get servers in a list',
  type: new GraphQLList(serverType),
  args: {},
  resolve(root, params, info, fieldASTs) {
    const projections = getProjection(fieldASTs)
    return ServerModel
      .find()
      .select(projections)
      .exec()
  }
}

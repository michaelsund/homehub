import { GraphQLList } from 'graphql'
import serverType from '../../types/server'
import getProjection from '../../get-projection'
import ServerModel from '../../../schema/ServerModel'
// import {
//   pubSub,
//   TOPIC_SERVER_CHANGED
// } from '../../pubSub'

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
    // const randomServer = await ServerModel.findOne({}, (err, server) => server)
    // console.log(`find one server: ${server.serverName}`)
    // pubSub.publish(TOPIC_SERVER_CHANGED, {
    //   serverChange: {
    //     _id: '5b18fe7e8fec62279d7039c9',
    //     serverName: 'Transmission',
    //     serverType: 'Torrentserver',
    //     serverIp: '192.168.1.6',
    //     port: 9091,
    //     status: false,
    //     lastChecked: 'Tue Apr 10 2018 16:24:40 GMT+0200 (W. Europe Daylight Time)'
    //   }
    // })
    return server
  }
}

import net from 'net'
import db from '../schema'
import {
  pubsub,
  SERVERS_CHANGED_TOPIC
} from '../graphql/pubsub'

const checkInterval = 1000 * 60
const timeout = 10000

const updateServersPubSub = updatedServers => {
  pubsub.publish(SERVERS_CHANGED_TOPIC, { serversChanged: updatedServers })
}

const portCheck = server => new Promise(resolve => {
  const updatedServer = server
  const lastChecked = new Date()
  updatedServer.lastChecked = lastChecked
  if (server.port !== null && server.port > 0 && server.port <= 65536) {
    const timer = setTimeout(() => {
      // Timed out
      updatedServer.status = false
      updatedServer.statusMessage = 'Port timed out'
      resolve(updatedServer)
      // eslint-disable-next-line
      socket.end()
    }, timeout)
    const socket = net.createConnection(server.port, server.serverIp, () => {
      clearTimeout(timer)
      // Responded
      socket.end()
      updatedServer.status = true
      updatedServer.statusMessage = 'Port is responding'
      resolve(updatedServer)
    })
    socket.on('error', () => {
      clearTimeout(timer)
      // Not responding
      updatedServer.status = false
      updatedServer.statusMessage = 'Port closed'
      resolve(updatedServer)
    })
  } else {
    updatedServer.status = false
    updatedServer.statusMessage = 'Invalid port confifured'
    console.log(`Invalid port configured ${server.serverName} ${server.port}`)
    resolve(updatedServer)
  }
})

const getServers = async () => {
  console.log('Checking server statuses...')
  const updated = await db.Server.find({}, (err, servers) =>
    Promise.all(servers.map(server => portCheck(server)))
      .then(results => results.map(server => server.save())))
  updateServersPubSub(updated)
}

const checkServerStatuses = () => {
  getServers()
  setInterval(() => {
    getServers()
  }, checkInterval)
}

export default checkServerStatuses

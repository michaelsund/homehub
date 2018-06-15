import net from 'net'
import db from '../schema'

const checkInterval = 1000 * 60
const timeout = 10000

const portCheck = server => new Promise(resolve => {
  const updatedServer = server
  const lastChecked = new Date()
  updatedServer.lastChecked = lastChecked
  if (server.port !== null) {
    const timer = setTimeout(() => {
      // console.log(`${server.serverIp}/${server.serverName} timed out on port ${server.port}`)
      updatedServer.status = false
      resolve(updatedServer)
      // eslint-disable-next-line
      socket.end()
    }, timeout)
    const socket = net.createConnection(server.port, server.serverIp, () => {
      clearTimeout(timer)
      // console.log(`${server.serverIp}/${server.serverName} responded on port ${server.port}`)
      socket.end()
      updatedServer.status = true
      resolve(updatedServer)
    })
    socket.on('error', () => {
      clearTimeout(timer)
      // console.log(`${server.serverIp}/${server.serverName}
      // is NOT responding on port ${server.port}`)
      updatedServer.status = false
      resolve(updatedServer)
    })
  }
  return null
})

const getServers = () => {
  db.Server.find({}, (err, servers) =>
    Promise.all(servers.map(server => portCheck(server)))
      .then(results => console.log(results)))
}

const checkServerStatuses = () => {
  getServers()
  setInterval(() => {
    getServers()
  }, checkInterval)
}

export default checkServerStatuses

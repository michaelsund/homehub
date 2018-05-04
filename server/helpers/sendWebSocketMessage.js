import WebSocket from 'ws'

const wss = new WebSocket.Server({ port: 40510 })

wss.on('connection', ws => {
  ws.on('message', message => {
    // TODO: Verify its a valid message! to prevent spam
    wss.clients.forEach(client => {
      // Send to everyone
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message))
      }
    })
  })
  ws.on('error', () => {});
})

const sendWebSocketMessage = message => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message))
    }
  })
}

export default sendWebSocketMessage

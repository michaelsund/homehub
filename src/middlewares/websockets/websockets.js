const socketMiddleware = (() => {
  let socket = null

  // eslint-disable-next-line
  const onOpen = (ws, store) => evt => {
    store.dispatch({ type: 'CONNECTED' })
  }

  // eslint-disable-next-line
  const onClose = (ws, store) => evt => {
    // Tell the store we've disconnected
    console.log('disconnected! Reconnecting in 5 seconds');
    // Retry delayed connect 5s
    setTimeout(() => {
      store.dispatch({ type: 'CONNECT' })
    }, 5000)
    // store.dispatch(actions.disconnected())
    store.dispatch({ type: 'DISCONNECTED' })
  }

  const onMessage = (ws, store) => evt => {
    // Parse the JSON message received on the websocket
    const message = JSON.parse(evt.data)
    // console.log(`websockets onMessage: ${JSON.stringify(message, null, 2)}`)
    store.dispatch(message)
  }

  // eslint-disable-next-line
  return store => next => action => {
    switch (action.type) {
      // The user wants us to connect
      case 'CONNECT':
        console.log('Starting new connection')
        // Start a new connection to the server
        if (socket != null) {
          socket.close()
        }
        // Send an action that shows a 'connecting...' status for now
        store.dispatch({ type: 'CONNECTING' })

        // Attempt to connect (we could send a 'failed' action on error)
        socket = new WebSocket('ws://localhost:40510')
        socket.onmessage = onMessage(socket, store)
        socket.onclose = onClose(socket, store)
        // TODO: Token?
        socket.onopen = onOpen(socket, store, action.token)

        break

      // The user wants us to disconnect
      case 'DISCONNECT':
        if (socket != null) {
          socket.close()
        }
        socket = null

        // Set our state to disconnected
        store.dispatch({ type: 'DISCONNECTED' })
        break

      // Send the 'SEND_MESSAGE' action down the websocket to the server
      // case 'SEND_CHAT_MESSAGE':
      //   console.log(`websockets SEND_CHAT_MESSAGE: ${JSON.stringify(action.text, null, 2)}`)
      //   socket.send(JSON.stringify(action.text))
      //   break

      // This action is irrelevant to us,  pass it on to the next middleware
      default:
        return next(action)
    }
  }
})()

export default socketMiddleware

// @flow

const initialState = {
  connected: false
}
const socket = (state: {} = initialState, action: any) => {
  switch (action.type) {
    case 'CONNECTED':
      return { connected: true }
    case 'CONNECTING':
      return state
    case 'DISCONNECTED':
      return { connected: false }
    case 'DISCONNECTING':
      return state
    default:
      return state
  }
}

export default socket

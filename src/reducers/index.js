// @flow

import { combineReducers } from 'redux'
import sensors from './sensors'
import sockets from './sockets'

export default combineReducers({
  sensors,
  sockets
})

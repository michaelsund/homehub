// @flow

import { combineReducers } from 'redux'
import sensorValues from './sensorValues'
import sensors from './sensors'
import sockets from './sockets'

export default combineReducers({
  sensors,
  sensorValues,
  sockets
})

// @flow

import { combineReducers } from 'redux'
import sensorValues from './sensorValues'
import sockets from './sockets'

export default combineReducers({
  sensorValues,
  sockets
})

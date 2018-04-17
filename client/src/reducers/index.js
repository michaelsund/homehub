// @flow

import { combineReducers } from 'redux'
import sensorValues from './sensorValues'
import sensors from './sensors'
import sockets from './sockets'
import controllers from './controllers'

export default combineReducers({
  sensors,
  sensorValues,
  controllers,
  sockets
})

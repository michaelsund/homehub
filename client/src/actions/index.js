export const newSensorValue = sensorValue => ({
  type: 'NEW_SENSOR_VALUE',
  sensorValue
})

export const setSensors = sensors => ({
  type: 'SET_SENSORS',
  sensors
})

export const setControllers = controllers => ({
  type: 'SET_CONTROLLERS',
  controllers
})

export const toggleController = controllerId => ({
  type: 'TOGGLE_CONTROLLER',
  controllerId
})

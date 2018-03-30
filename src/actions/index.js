export const newSensorValue = sensorValue => ({
  type: 'NEW_SENSOR_VALUE',
  sensorValue
})

export const setSensors = sensors => ({
  type: 'SET_SENSORS',
  sensors
})

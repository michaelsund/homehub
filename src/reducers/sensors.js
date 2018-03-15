// @flow

const initialState = []

const replaceOrAddSensor = (state, sensor) => {
  const existsAt = state.findIndex(s => s._id === sensor._id)
  if (existsAt < 0) {
    return [sensor, ...state]
  }
  return [sensor, ...state.pop(existsAt)]
}

const sensors = (state: any[] = initialState, action: any) => {
  switch (action.type) {
    case 'SET_SENSORS':
      // Recieves result of fetch for specific sensor and adds to array, if exists replace
      // Multiple sensors will update this list
      // replaceOrAddSensor(state, action.sensor)
      return replaceOrAddSensor(state, action.sensor)
    // WS Triggered
    case 'NEW_SENSOR_VALUE':
      // Look for the sensorId and assign the new value to values array
      return state
    default:
      return state
  }
}

export default sensors

// @flow

const initialState = []

const sensors = (state: any[] = initialState, action: any) => {
  switch (action.type) {
    case 'SET_SENSORS':
      return action.sensors
    case 'UPDATE_SENSOR_VALUE':
      return state.reduce((sensorList, sensor) => {
        if (sensor._id === action.sensorId) {
          sensorList.push({
            ...sensor,
            lastReportedTime: action.lastReportedTime,
            lastReportedValue: action.lastReportedValue
          })
        } else {
          sensorList.push(sensor)
        }
        return sensorList
      }, [])
    default:
      return state
  }
}

export default sensors

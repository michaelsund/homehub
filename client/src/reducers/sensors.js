// @flow

const initialState = []

const sensors = (state: any[] = initialState, action: any) => {
  switch (action.type) {
    case 'SET_SENSORS':
      return action.sensors
    case 'SENSOR_ALARM_ACK':
      return state.reduce((sensorList, sensor) => {
        if (sensor._id === action.sensorId) {
          sensorList.push({
            ...sensor,
            maxAgeAlarmActive: false,
            maxValueAlarmActive: false,
            minValueAlarmActive: false
          })
        } else {
          sensorList.push(sensor)
        }
        return sensorList
      }, [])
    case 'SENSOR_ALARM_ACTIVE':
      return state.reduce((sensorList, sensor) => {
        if (sensor._id === action.sensorId) {
          switch (action.alarmType) {
            case 'maxValue':
              sensorList.push({
                ...sensor,
                maxValueAlarmActive: true
              })
              break;
            case 'minValue':
              sensorList.push({
                ...sensor,
                minValueAlarmActive: true
              })
              break;
            case 'maxAge':
              sensorList.push({
                ...sensor,
                maxAgeAlarmActive: true
              })
              break;
            default:
              sensorList.push(sensor)
              break;
          }
        } else {
          sensorList.push(sensor)
        }
        return sensorList
      }, [])
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

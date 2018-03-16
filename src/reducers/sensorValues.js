// @flow

const initialState = []

const sensorValues = (state: any[] = initialState, action: any) => {
  switch (action.type) {
    // WS Triggered
    case 'NEW_SENSOR_VALUE':
      console.log(action)
      return [
        action.newSensorValue,
        ...state
      ]
    default:
      return state
  }
}

export default sensorValues

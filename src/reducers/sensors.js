// @flow

const initialState = []

const sensors = (state: any[] = initialState, action: any) => {
  switch (action.type) {
    case 'SET_SENSORS':
      return action.sensors
    default:
      return state
  }
}

export default sensors

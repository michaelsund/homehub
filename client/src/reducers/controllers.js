// @flow

const initialState = []

const controllers = (state: any[] = initialState, action: any) => {
  switch (action.type) {
    case 'SET_CONTROLLERS':
      return action.controllers
    case 'TOGGLE_CONTROLLER':
      console.log(`toggling: ${action.controllerId}`)
      return state.map(controller => {
        if (controller._id !== action.controllerId) {
          return controller
        }
        console.log('found the one')
        return {
          ...controller,
          status: true
        }
      })
    default:
      return state
  }
}

export default controllers

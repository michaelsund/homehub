import Moment from 'moment'
import Controller from '../schema/ControllerModel'
import telldusDeviceToggle from './telldusDeviceToggle'

Moment.locale('sv')

const checkControllerTimer = () => {
  setInterval(() => {
    const now = Moment().format('LT')
    Controller.find({ timer: true }, (err, controllers) => {
      if (controllers) {
        controllers.map(controller => {
          if (controller.onTime !== '' || controller.offTime !== '') {
            // console.log(`${now} - ${controller.onTime} and ${controller.offTime}`)
            if (now === controller.onTime) {
              console.log(`${controller.name} onTime now!`)
              telldusDeviceToggle(controller._id, true)
            } else if (now === controller.offTime) {
              console.log(`${controller.name} offTime now!`)
              telldusDeviceToggle(controller._id, false)
            }
          }
          return null
        })
      }
    })
  }, 60000)
}

export default checkControllerTimer

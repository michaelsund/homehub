import {
  pubsub,
  CONTROLLERS_UPDATED_TOPIC
} from '../graphql/pubsub'
import Controller from '../schema/ControllerModel'
import telldusDeviceStatus from './telldusDeviceStatus'
import settings from '../../client/src/settings.json'

let telldus = null

if (!settings.dev) {
  // eslint-disable-next-line
  telldus = require('telldus')
}

const updateControllersPubSub = () => {
  const updatedControllerList = Controller.find({})
  pubsub.publish(CONTROLLERS_UPDATED_TOPIC, { controllersUpdated: updatedControllerList })
}

const telldusDeviceToggle = (controllerId, forcedState = null) => new Promise(resolve => {
  if (settings.dev) {
    console.log('In dev mode, returning just the controller from db')
    Controller.findById(controllerId, (err, data) => {
      resolve(data)
    })
  }
  Controller.findById(controllerId, (err, controller) => {
    if (err) {
      console.log(err)
      Controller.findById(controllerId, (err, data) => {
        resolve(data)
      })
    }
    telldusDeviceStatus(controller.identificationId)
      .then(status => {
        if (forcedState !== null) {
          if (forcedState) {
            telldus.turnOn(controller.identificationId, err => {
              if (err) {
                console.log(err)
              }
              controller.set({ status: true })
              controller.save((err, updatedController) => {
                resolve(updatedController)
              })
            })
          } else {
            telldus.turnOff(controller.identificationId, err => {
              if (err) {
                console.log(err)
              }
              controller.set({ status: false })
              controller.save((err, updatedController) => {
                resolve(updatedController)
              })
            })
          }
        } else if (status) {
          console.log(`controller ${controller.name} status: ${status}, turning off`)
          telldus.turnOff(controller.identificationId, err => {
            if (err) {
              console.log(err)
            }
            controller.set({ status: false })
            controller.save((err, updatedController) => {
              updateControllersPubSub()
              resolve(updatedController)
            })
          })
        } else {
          console.log(`controller ${controller.name}  status: ${status}, turning on`)
          telldus.turnOn(controller.identificationId, err => {
            if (err) {
              console.log(err)
            }
            controller.set({ status: true })
            controller.save((err, updatedController) => {
              updateControllersPubSub()
              resolve(updatedController)
            })
          })
        }
      })
      .catch(err => {
        console.log(err)
        Controller.findById(controllerId, (err, data) => {
          resolve(data)
        })
      })
  })
})

export default telldusDeviceToggle

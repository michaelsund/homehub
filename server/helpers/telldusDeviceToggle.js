import Controller from '../schema/ControllerModel'
import telldusDeviceStatus from './telldusDeviceStatus'
import settings from '../../client/src/settings.json'

let telldus = null

if (!settings.dev) {
  telldus = require('telldus')
}

const telldusDeviceToggle = controllerId => new Promise(resolve => {
  if (settings.dev) {
    console.log('In dev mode, returning mock result')
    console.log(`returning: ${JSON.stringify({ result: false, status: false })}`)
    resolve(Object.assign({ result: false, status: false }))
  }
  Controller.findById(controllerId, (err, controller) => {
    if (err) {
      console.log(err)
      console.log(`returning: ${JSON.stringify({ result: false, status: false })}`)
      resolve(Object.assign({ result: false, status: false }))
    }
    telldusDeviceStatus(controller.name)
      .then(status => {
        if (status) {
          console.log(`controller ${controller.name} status: ${status}, turning off`)
          telldus.turnOff(controller.otherId, err => {
            if (err) {
              console.log(err)
            }
            console.log(`returning: ${JSON.stringify({ result: true, status: false })}`)
            resolve(Object.assign({ result: true, status: false }))
          })
        } else {
          console.log(`controller ${controller.name}  status: ${status}, turning on`)
          telldus.turnOn(controller.otherId, err => {
            if (err) {
              console.log(err)
            }
            console.log(`returning: ${JSON.stringify({ result: true, status: true })}`)
            resolve(Object.assign({ result: true, status: true }))
          })
        }
      })
      .catch(err => {
        console.log(err)
        console.log(`returning: ${JSON.stringify({ result: false, status: false })}`)
        resolve(Object.assign({ result: false, status: false }))
      })
  })
})

export default telldusDeviceToggle

import telldus from 'telldus'
import Controller from '../schema/ControllerModel'
import settings from '../../client/src/settings.json'
import telldusDeviceStatus from './telldusDeviceStatus'

const telldusDeviceToggle = controllerId => new Promise((resolve, reject) => {
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
          console.log(`controller status: ${status}, turning off`)
          telldus.turnOff(1, err => {
            if (err) {
              console.log(err)
            }
            console.log(`returning: ${JSON.stringify({ result: true, status: false })}`)
            resolve(Object.assign({ result: true, status: false }))
          })
        } else {
          console.log(`controller status: ${status}, turning on`)
          telldus.turnOn(1, err => {
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

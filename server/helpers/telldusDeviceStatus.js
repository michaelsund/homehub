import telldus from 'telldus'

const telldusDeviceStatus = deviceName => new Promise((resolve, reject) => {
  telldus.getDevices((err, devices) => {
    const result = devices.filter(device => device.name === deviceName)
    if (result.length > 0) {
      if (result[0].status.name === 'ON') {
        console.log('Status is ON')
        resolve(true)
      } else {
        console.log('Status is OFF')
        resolve(false)
      }
    } else {
      console.log(`device not found ${deviceName}`)
      reject(new Error('device not found'))
    }
  })
})

export default telldusDeviceStatus

import { TradfriClient } from 'node-tradfri-client'
import settings from '../../client/src/settings.json'

const bulbsStore = []
const tmpBulbs = []
export const getBulbStore = () => bulbsStore

const tradfriDeviceUpdated = data => {
  console.log(data)
  // Check if the device allready has been added, update it.
  const bulb = {
    name: data.name,
    instanceId: data.instanceId,
    status: data.lightList[0].onOff,
    color: data.lightList[0].color,
    dimmer: data.lightList[0].dimmer,
  }

  if (bulbsStore.length > 0) {
    bulbsStore.map(group => {
      if (group.deviceIDs.includes(data.instanceId)) {
        const index = group.bulbs.findIndex(b => b.instanceId === data.instanceId)
        group.bulbs[index] = bulb
      }
      return null
    })
  }

  // Only used first run, since tradfri device event is receieved first
  if (bulbsStore.length === 0) {
    tmpBulbs.push(bulb)
  }
}

const tradfriGroupUpdated = data => {
  // Groupghanges only considered for first run, needs to handle group updates aswell
  tmpBulbs.map(b => {
    if (data.deviceIDs.includes(b.instanceId)) {
      const index = bulbsStore.findIndex(group => group.instanceId === data.instanceId)
      if (index !== -1) {
        // console.log('using existing group')
        bulbsStore[index].bulbs.push(b)
      } else {
        // console.log('creating group')
        bulbsStore.push({
          name: data.name,
          instanceId: data.instanceId,
          deviceIDs: data.deviceIDs,
          bulbs: [b]
        })
      }
    }
    return null
  })
}

export const tradfriEvents = async () => {
  const tradfri = new TradfriClient('192.168.1.50')

  if (settings.tradfriId && settings.tradfriPsk) {
    try {
      await tradfri.connect(settings.tradfriId, settings.tradfriPsk)
      console.log('Connected to tradfri gateway')
    } catch (e) {
      console.log(e)
    }

    tradfri
      .on('device updated', tradfriDeviceUpdated)
      .observeDevices()

    tradfri
      .on('group updated', tradfriGroupUpdated)
      .observeGroupsAndScenes()
  }
}

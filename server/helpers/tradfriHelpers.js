import { TradfriClient } from 'node-tradfri-client'
import settings from '../../client/src/settings.json'
import {
  pubsub,
  TRADFRI_UPDATED_TOPIC
} from '../graphql/pubsub'

let tradfri = null
const bulbsStore = []
const tmpBulbs = []
// const rawBulbs = []
const rawGroups = []
export const getBulbStore = () => bulbsStore

export const toggleBulbOrGroup = (instanceId, onOff) => {
  const group = rawGroups[instanceId]
  group.toggle(onOff)
}

const tradfriDeviceUpdated = async data => {
  // Check if the device allready has been added, update it.
  const bulb = {
    name: data.name,
    instanceId: data.instanceId,
    status: data.lightList[0].onOff,
    color: data.lightList[0].color,
    dimmer: data.lightList[0].dimmer,
    alive: data.alive,
  }

  if (bulbsStore.length > 0) {
    await bulbsStore.map(group => {
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

  // pubsub.publish(TRADFRI_UPDATED_TOPIC, { tradfriUpdated: bulbsStore })
}

const tradfriGroupUpdated = async data => {
  // Add to rawGroups for commands
  if (typeof rawGroups[data.instanceId] === 'undefined') {
    rawGroups[data.instanceId] = data
  }


  // Checks if the group exists and removes it before recreating from tmpBulbs
  const index = bulbsStore.findIndex(group => group.instanceId === data.instanceId)
  if (index !== -1) {
    bulbsStore.splice(index, 1)
  }

  await tmpBulbs.map(bulb => {
    if (data.deviceIDs.includes(bulb.instanceId)) {
      const groupIndex = bulbsStore.findIndex(group => group.instanceId === data.instanceId)
      // Creates the group if none existing whet looping trough tmpBulbs
      if (groupIndex !== -1) {
        // Add bulb
        bulbsStore[groupIndex].bulbs.push(bulb)
      } else {
        // Create group and add bulb to it
        bulbsStore.push({
          name: data.name,
          instanceId: data.instanceId,
          deviceIDs: data.deviceIDs,
          bulbs: [bulb]
        })
      }
    }
    return null
  })
  pubsub.publish(TRADFRI_UPDATED_TOPIC, { tradfriUpdated: bulbsStore })
}

export const tradfriEvents = async () => {
  tradfri = new TradfriClient(settings.tradfriIp)

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

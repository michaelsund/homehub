import { TradfriClient } from 'node-tradfri-client'
import settings from '../../client/src/settings.json'
import {
  pubsub,
  TRADFRI_UPDATED_TOPIC
} from '../graphql/pubsub'

let tradfri = null
const bulbsStore = []
const rawGroups = []
const rawBulbs = []
export const getBulbStore = () => bulbsStore

export const toggleBulbOrGroup = (instanceId, onOff) => {
  const group = rawGroups[instanceId]
  group.toggle(onOff)
}

async function regenerateBulbStoreFromDevice(bulb = null) {
  console.log('in regen Device!!')
  await bulbsStore.map(g => {
    g.bulbs.map(b => {
      if (b.instanceId === bulb.instanceId) {
        b = {
          name: bulb.name,
          instanceId: bulb.instanceId,
          status: bulb.lightList[0].onOff,
          color: bulb.lightList[0].color,
          dimmer: bulb.lightList[0].dimmer,
          alive: bulb.alive,
        }
        console.log('regenerate from dev')
        console.log(bulb.lightList[0].onOff)
      }
      return null
    })
    return null
  })
  // pubsub.publish(TRADFRI_UPDATED_TOPIC, { tradfriUpdated: bulbsStore })
}

async function regenerateBulbStoreFromGroup(groupIndex) {
  console.log(`regenerating group with index: ${groupIndex}`)
  bulbsStore[groupIndex].bulbs = []
  await rawBulbs.map(b => {
    if (bulbsStore[groupIndex].deviceIDs.includes(b.instanceId)) {
      bulbsStore[groupIndex].bulbs.push({
        name: b.name,
        instanceId: b.instanceId,
        status: b.lightList[0].onOff,
        color: b.lightList[0].color,
        dimmer: b.lightList[0].dimmer,
        alive: b.alive,
      })
    }
    return null
  })
}

const tradfriDeviceUpdated = async data => {
  console.log('device event')
  const index = await rawBulbs.findIndex(b => b.instanceId === data.instanceId)
  if (index !== -1) {
    rawBulbs[index] = data
  } else {
    rawBulbs.push(data)
  }

  await regenerateBulbStoreFromDevice(data)
  console.log('done with update, sending new store')
  pubsub.publish(TRADFRI_UPDATED_TOPIC, { tradfriUpdated: bulbsStore })
}

const tradfriGroupUpdated = async data => {
  console.log('group event')
  if (typeof rawGroups[data.instanceId] === 'undefined') {
    rawGroups[data.instanceId] = data
  }

  const index = await bulbsStore.findIndex(g => g.instanceId === data.instanceId)
  console.log(`g event index: ${index}`)
  if (index === -1) {
    bulbsStore.push({
      name: data.name,
      instanceId: data.instanceId,
      deviceIDs: data.deviceIDs,
      bulbs: []
    })
    regenerateBulbStoreFromGroup(bulbsStore.length - 1)
  } else {
    const tmpBulbs = bulbsStore[index].bulbs
    bulbsStore[index] = {
      name: data.name,
      instanceId: data.instanceId,
      bulbs: tmpBulbs,
      deviceIDs: data.deviceIDs
    }
    regenerateBulbStoreFromGroup(index)
  }
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

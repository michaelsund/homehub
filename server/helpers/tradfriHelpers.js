import { TradfriClient } from 'node-tradfri-client'
import settings from '../../client/src/settings.json'
import {
  pubsub,
  TRADFRI_UPDATED_TOPIC
} from '../graphql/pubsub'

let tradfri = null
const rawGroups = []
const rawBulbs = []

export const getBulbStore = async () => {
  const store = []
  await rawGroups.map(group => store.push({
    name: group.name,
    instanceId: group.instanceId,
    deviceIDs: group.deviceIDs,
    status: group.onOff,
    bulbs: [],
  }))

  await store.map(group =>
    group.deviceIDs.map(deviceID => group.bulbs.push({
      name: rawBulbs[deviceID].name,
      instanceId: rawBulbs[deviceID].instanceId,
      status: rawBulbs[deviceID].lightList[0].onOff,
      color: rawBulbs[deviceID].lightList[0].color,
      dimmer: rawBulbs[deviceID].lightList[0].dimmer,
      alive: rawBulbs[deviceID].alive,
    })))

  return (store)
}

export const toggleBulbOrGroup = (instanceId, onOff) => {
  const group = rawGroups[instanceId]
  group.toggle(onOff)
}

const tradfriDeviceUpdated = async data => {
  rawBulbs[data.instanceId] = data
  const bulbsStore = getBulbStore()
  pubsub.publish(TRADFRI_UPDATED_TOPIC, { tradfriUpdated: bulbsStore })
}

const tradfriGroupUpdated = data => {
  rawGroups[data.instanceId] = data
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

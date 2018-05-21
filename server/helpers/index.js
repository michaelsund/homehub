import checkSensorAlarmTrigger from './checkSensorAlarmTrigger'
import checkSensorMaxAge from './checkSensorMaxAge'
import sendWebSocketMessage from './sendWebSocketMessage'
import sensorEvents from './sensorEvents'
import telldusDeviceStatus from './telldusDeviceStatus'
import telldusDeviceToggle from './telldusDeviceToggle'

export default {
  checkSensorAlarmTrigger,
  sendWebSocketMessage,
  checkSensorMaxAge,
  sensorEvents,
  telldusDeviceStatus,
  telldusDeviceToggle
}

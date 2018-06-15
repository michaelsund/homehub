import controller from './controller'
import sensor from './sensor'
import sensorvalues from './sensorvalues'
import server from './server'

export default {
  ...controller,
  ...sensor,
  ...sensorvalues,
  ...server
}

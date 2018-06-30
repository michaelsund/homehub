import {
  pubsub,
  SENSORS_UPDATED_TOPIC
} from '../graphql/pubsub'
import Sensor from '../schema/SensorModel'

const sensorsPubSub = () => {
  console.log('updating sensors via subscriptions!')
  const updatedSensorList = Sensor.find({})
  pubsub.publish(SENSORS_UPDATED_TOPIC, { sensorsUpdated: updatedSensorList })
}

export default sensorsPubSub

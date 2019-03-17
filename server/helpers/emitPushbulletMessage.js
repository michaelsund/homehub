import PushBullet from 'pushbullet'
import settings from '../../client/src/settings.json'

const Send = (messageType, message) => {
  const pusher = new PushBullet(settings.pushBulletKey)
  pusher.note({
    channel_tag: settings.pushBulletChannel
  }, messageType, message, (err, res) => {
    if (err) {
      console.log(err)
    } else {
      console.log(res)
    }
  })
}

export default Send

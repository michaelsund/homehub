Spin up a local mongodb instance for development, replace /User/.. with your own path to the project server/db dir.
docker run -it --rm -p 27017:27017 --name mongo1 -v /Users/michael/Code/hut/server/db:/data/db mongo
without a prestored db
docker run -it --rm -p 27017:27017 --name mongo1 mongo

create server/settings.json with the following content for pushbullet messages.
{
  "mongoServer": "localhost",
  "mongoUser": "",
  "mongoPass": "",
  "pushBulletKey": "your_api_key",
  "pusBulletChannel": "your_channel",
  "telldusDuoConnected": false
}

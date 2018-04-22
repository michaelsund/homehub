Spin up a local mongodb instance for development, replace /User/.. with your own path to the project server/db dir.
docker run -d -p 27017:27017 --name mongo1 -v /path/to/hut/server/db:/data/db mongo
without a persistent db
docker run -d -p 27017:27017 --name mongo1 mongo

create server/settings.json with the following content for pushbullet messages.
{
  "mongoServer": "localhost",
  "mongoUser": "",
  "mongoPass": "",
  "pushBulletKey": "your_api_key",
  "pusBulletChannel": "your_channel",
  "telldusDuoConnected": false
}

Follow this guide to install tellstick support
https://github.com/Hexagon/node-telldus#installation
yarn add node-gyp telldus

build the image
docker build -t hut .

start it with tellstick connected
docker run -d -p 5000:5000 --device /dev/bus/usb:/dev/bus/usb --name my_hut hut

or without tellstick
docker run -d -p 5000:5000 --name my_hut hut

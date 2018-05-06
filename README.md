Spin up a local mongodb instance for development, replace /User/.. with your own path to the project server/db dir.
docker run -d -p 27017:27017 --name mongo1 -v /path/to/hut/server/db:/data/db mongo
without a persistent db
docker run -d -p 27017:27017 --name mongo1 mongo

create client/src/settings.json with the following content for pushbullet messages.
{
  "dev": true,
  "prodIp": "192.168.1.X",
  "mongoServer": "192.168.1.X",
  "mongoUser": "",
  "mongoPass": "",
  "pushBulletKey": "your_api_key",
  "pusBulletChannel": "your_channel"
}

Follow this guide to install tellstick support
https://github.com/Hexagon/node-telldus#installation
yarn add node-gyp telldus

build the image
docker build -t hut .

start it with tellstick connected
docker run -d -p 5000:5000 -p 40510:40510 --device /dev/bus/usb:/dev/bus/usb --name my_hut hut

or without tellstick
docker run -d -p 5000:5000 -p 40510:40510 --name my_hut hut

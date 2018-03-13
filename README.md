Spin up a local mongodb instance for development, replace /User/.. with your own path to the project server/db dir.
docker run -d -p 27017:27017 --name mongo1 -v /Users/michael/Code/hut/server/db:/data/db mongo

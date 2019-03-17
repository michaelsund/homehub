#!/bin/bash
#
# Tars and copies itself to server
#
echo "DONT FORGET TO SET DEV TO FALSE!!!!"
sleep 5
rm -r node_modules
echo "Deleting local node_modules"
rm -r client/node_modules
rm ..\hut.tar.gz
echo "Preparing to copy to host"
cd .. && tar pczf hut.tar.gz hut && scp hut.tar.gz michael@192.168.1.2:~/
echo "Building docker image over ssh..."
ssh michael@192.168.1.2 "rm Dockerbuilds/hut.tar.gz && mv hut.tar.gz Dockerbuilds/ && cd Dockerbuilds && rm -r hut && tar zxf hut.tar.gz && cd hut && docker build -t hut ."
echo "Done with Server! reinstalling local node modules..."
cd hut && yarn installdeps

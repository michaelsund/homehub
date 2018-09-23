#!/bin/bash
#
# Tars and copies itself to server
#
echo "DONT FORGET TO SET DEV TO FALSE!!!!"
sleep 5
rm -r node_modules
rm -r client/node_modules
rm ../hut.tar.gz
cd .. && tar pczf hut.tar.gz hut/ && scp hut.tar.gz 192.168.1.2:~/
ssh 192.168.1.2 'mv hut.tar.gz Dockerbuilds/ && cd Dockerbuilds && rm -r hut && tar zxf hut.tar.gz && cd hut && docker build -t hut .'
echo "Done with Server! reinstalling local node modules..."
cd hut && yarn installdeps

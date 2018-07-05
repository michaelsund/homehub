FROM node:carbon
WORKDIR /usr/src/app
COPY . .
RUN echo "deb http://download.telldus.com/debian/ stable main" >> /etc/apt/sources.list && wget -q http://download.telldus.com/debian/telldus-public.key -O- | apt-key add -
RUN apt update && apt install -y \
  telldus-core libtelldus-core-dev
COPY server/tellstick.conf /etc
RUN npm install -g nodemon
RUN npm install
RUN npm install telldus
RUN cd client/ && npm install && npm run build && mv build ../server/build
CMD sh startscript.sh
EXPOSE 5000

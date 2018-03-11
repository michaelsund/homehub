FROM node:carbon
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN echo "deb http://download.telldus.com/debian/ stable main" >> /etc/apt/sources.list && wget -q http://download.telldus.com/debian/telldus-public.key -O- | apt-key add -
RUN apt update && apt install -y \
  telldus-core
COPY tellstick.conf /etc
CMD sh startscript.sh
EXPOSE 8080

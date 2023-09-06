FROM node:15.5.1-alpine3.10 as node
RUN mkdir -p /client
WORKDIR /client
COPY package.json /client
RUN npm install --legacy-peer-deps
COPY . /client
CMD npm run start

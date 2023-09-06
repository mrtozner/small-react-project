FROM node:15.5.1-alpine3.10
WORKDIR /usr/src/app
COPY backend/package.json ./
WORKDIR /usr/src/app
RUN npm cache clean --force
RUN npm install
COPY backend/. .
CMD npm run dev

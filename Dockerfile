FROM node:16.3.0-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
COPY . .
RUN npm install -g yarn
RUN yarn
COPY --chown=node:node . .
EXPOSE 8080
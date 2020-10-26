FROM node:12-alpine

WORKDIR /usr/src/app

COPY package*.json ./
# COPY . .
RUN npm install --production

# EXPOSE 3000

# CMD [ "npm", "start" ]

FROM node:17-alpine

WORKDIR /var/app

#ENV PATH /var/app/node_modules/.bin:$PATH

COPY package*.json ./
RUN npm install --silent

COPY . ./

CMD ["npm", "start"]
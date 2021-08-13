FROM node:16-alpine3.11

WORKDIR /opt/todoapp

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

COPY package-lock.json ./

RUN npm install --silent

RUN npm install react-scripts -g --silent

COPY . .

EXPOSE 4200

CMD ["npm", "start"]

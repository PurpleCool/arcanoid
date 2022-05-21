# pull official base image
FROM node:16-alpine as builder

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json /app/package.json

RUN npm install --only=prod

# add app
COPY . /app

EXPOSE 3000

# start app
CMD ["npm", "start"]
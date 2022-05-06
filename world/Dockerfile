# pull the official base image
FROM node:14-alpine
# set working direction
WORKDIR /app

# copy packages for install
COPY ./package.json /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# copy app to my container
COPY . .
# install npm dependencies
RUN yarn install
RUN yarn global add react-scripts
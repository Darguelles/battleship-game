FROM node:9.4

EXPOSE 8080
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

ADD package.json /usr/src/app/package.json
RUN npm install

COPY . /usr/src/app

CMD ["npm", "start"]
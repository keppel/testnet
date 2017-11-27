FROM node:carbon

WORKDIR /usr/src/app

COPY . .
RUN npm install

ENV TENDERMINT_PORT 46657
EXPOSE 46657
CMD [ "npm", "start" ]
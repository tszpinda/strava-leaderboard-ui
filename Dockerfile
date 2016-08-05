FROM node:5.9.1

RUN mkdir -p /data/app
WORKDIR /data/app

RUN npm install gulp -g

ADD app/package.json /data/package.json
# --no-optional  - so leveldb isnt installed
RUN npm install --no-optional

EXPOSE 3000

WORKDIR /data/app
CMD ["npm", "start"]

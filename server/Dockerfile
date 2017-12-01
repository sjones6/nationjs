FROM node:carbon

COPY . /app
RUN npm i -g yarn
RUN cd /app && yarn

CMD ["node", "/app/server.js"]

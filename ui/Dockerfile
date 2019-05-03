FROM node:8

WORKDIR /tour

COPY . /tour

RUN npm install
RUN npm run build
RUN npm install -g serve


CMD [ "serve", "-s", "build", "-l", "tcp://0.0.0.0:5000", "-n"]

EXPOSE 5000

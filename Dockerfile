FROM node:10.16

RUN npm install -g npm

WORKDIR /app
COPY . /app/

RUN npm install
RUN npm run build

EXPOSE 3000

ENV HOST 0.0.0.0

CMD ["npm", "run", "start"]

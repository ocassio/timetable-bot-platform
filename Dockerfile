FROM node:alpine

RUN mkdir /timetable-bot-platform
WORKDIR /timetable-bot-platform
ADD . .

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
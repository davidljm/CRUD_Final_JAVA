FROM node:14-alpine
LABEL authors="davidljm"
WORKDIR /home/davidljm/Documents/BootCamp AWS/CRUD_Final_JAVA/front_api_crud
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

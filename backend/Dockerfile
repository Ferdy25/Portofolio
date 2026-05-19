FROM node:18-alpine

WORKDIR /app

RUN npm install -g nodemon

COPY package*.json ./
RUN npm install

COPY . .

RUN mkdir -p uploads

EXPOSE 3000

# Jalanin seed dulu, BARU server
CMD sh -c "node seed.js & sleep 15 && npm run dev"
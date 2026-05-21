FROM node:18-alpine

WORKDIR /app

# Install dependencies for native modules (like bcrypt)
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD sh -c "node seed.js & sleep 15 && npm run dev"
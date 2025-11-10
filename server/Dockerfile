FROM node:20-alpine
WORKDIR /app

COPY package*.json ./

# Install all runtime dependencies
RUN npm install

COPY . .

EXPOSE 5000
CMD ["npm", "start"]

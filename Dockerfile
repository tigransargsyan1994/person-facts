FROM node:20-alpine
WORKDIR /app
COPY server.js ./
RUN npm install express dotenv
EXPOSE 3000
COPY .env ./
CMD ["node", "server.js"]
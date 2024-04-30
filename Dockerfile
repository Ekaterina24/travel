FROM node:18-alpine
COPY package.json ./
RUN npm install --force --legacy-peer-deps
COPY . .
EXPOSE 3000
CMD npm run start:dev
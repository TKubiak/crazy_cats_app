### STAGE 1: Build ###
FROM node:16.10-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

### STAGE 2: Run integration tests ###
RUN npm run e2e

### STAGE 3: static analysis via Sonarqube ### TODO:
FROM sonarqube:8.9-community
# CMD tail -f /dev/null
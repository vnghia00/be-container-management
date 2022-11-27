FROM node:14.17.0-alpine3.11 AS dev

WORKDIR /app

COPY package*.json ./
RUN yarn install

COPY . .

RUN npm run build

# final image
FROM node:14.17.0-alpine3.11 as prod

WORKDIR /app

COPY . .

COPY --from=dev /app/dist ./dist

RUN yarn install --production

# EXPOSE 8080
ENTRYPOINT ["npm", "run", "start:prod"]
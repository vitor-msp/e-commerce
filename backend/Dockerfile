FROM node:18.15.0-alpine AS builder
RUN mkdir /api
WORKDIR /api
COPY . .
RUN npm install
RUN npm run build

FROM node:18.15.0-alpine
RUN mkdir /api
WORKDIR /api
COPY --from=builder /api/dist ./dist
COPY package.json .
RUN npm install --only=production
EXPOSE 3001
CMD ["npm", "run", "start"]
FROM node:18.15.0-alpine AS builder
RUN mkdir /app
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:1.21.0-alpine
ENV NODE_ENV production
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
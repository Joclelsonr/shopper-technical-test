FROM node:alpine AS builder

WORKDIR /tmp/frontend

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.15.0-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /tmp/frontend/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
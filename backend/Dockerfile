FROM node:alpine

WORKDIR /usr/app

COPY . .

COPY wait-for-db.sh /wait-for-db.sh
RUN chmod +x /wait-for-db.sh

CMD ["/wait-for-db.sh", "mysql", "3306", "sh", "-c", "npx prisma migrate dev --name init && npm run dev"]

EXPOSE 8080
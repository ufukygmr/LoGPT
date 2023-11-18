from node:latest as build

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV DATABASE_URL="postgresql://eaqwwtmitazcnc:cdf67424b1a39dbfad753f5719151bb3870d55676d4d5ee0c7ff5ceecd25946e@ec2-54-73-22-169.eu-west-1.compute.amazonaws.com:5432/d98gkb2pu46era?schema=public"

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

RUN npx prisma migrate deploy

EXPOSE 8000

CMD ["npm", "run", "start"]

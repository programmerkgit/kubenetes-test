FROM node:10.15.3
ENV NODE_ENV prod
ENV PORT 3000
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm","run" ,"start"]

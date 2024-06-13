FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production

COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]



# docker build -t nombre-de-tu-app .
# docker run -p 8080:8080 nombre-de-tu-app
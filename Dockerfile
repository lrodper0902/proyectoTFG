FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Copiamos todos los archivos y directorios
COPY . .  

EXPOSE 8080
CMD [ "node", "server.js" ]



# docker build -t nombre-de-tu-app .
# docker run -p 8080:8080 nombre-de-tu-app
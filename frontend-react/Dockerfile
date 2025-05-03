# Dockerfile en frontend-react

FROM node:20

WORKDIR /app

# Copia los archivos de package.json
COPY package*.json ./

RUN npm install

# Copia el resto del código fuente
COPY . .

CMD ["npm", "start"]

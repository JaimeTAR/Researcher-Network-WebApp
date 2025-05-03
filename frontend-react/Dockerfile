# Usa una imagen base de Node.js
FROM node:20

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Paso 1: Eliminar node_modules y package-lock.json
RUN rm -rf node_modules package-lock.json

# Paso 2: Instalar dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Expón el puerto por defecto de Vite
EXPOSE 5173

# Comando para ejecutar Vite en desarrollo
CMD ["npm", "run", "build"]

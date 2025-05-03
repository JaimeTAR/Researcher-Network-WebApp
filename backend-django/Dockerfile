# Usa una imagen base de Python
FROM python:3.11-slim-bullseye

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo requirements.txt desde 'ev2project'
COPY ev2project/requirements.txt /app/requirements.txt

# Instala las dependencias de Python
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copia todo el contenido de 'ev2project' al contenedor
COPY ev2project /app

# Copia el archivo .env desde 'ev2project/ev2' al contenedor
COPY ev2project/ev2/.env /app/ev2/.env

# Expón el puerto en el que corre la app
EXPOSE 8000

# Comando para ejecutar el servidor de Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

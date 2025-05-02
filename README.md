# Researcher Network Webapp

![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white) ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white) ![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)

### Collaborators

1. ###### Jaime Alfaro
2. ###### Arturo Gutiérrez

## Swagger documentation

Swagger is used for documentation of the api, when navigating to `/swagger` on the backend, the documentation will be available.

## Nginx implementation

Used Nginx to serve as a reverse proxy and balance loader, having 3 different instances of the server, being managed by our central Nginx server.

The files for the dockerization of the backend are located inside the `backend-django/ev2project` folder.

File `Dockerfile` is used to build the image for the backend.

File `docker-compose.yml` is used to build the three different instances of the server.

Then we need an Nginx server with the following configuration:

```yml
# nginx.conf

worker_processes 1;

events {
worker_connections 1024;
}

http {
include mime.types;

upstream django_cluster {
least_conn;
server 127.0.0.1:8001;
server 127.0.0.1:8002;
server 127.0.0.1:8003;
}

server {
listen 8080;
server_name localhost;

location / {
proxy_pass http://django_cluster;
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
}
}
}
```

## Technologies Used

### Frontend

- React + Vite
- TypeScript
- TailwindCSS

### Backend

- Python + Django
- MySQL database
- Postman for testing

## Libraries Used

### Frontend

- Axios - 1.8.4
- React Router - 7.4.1
- React Spinners- 0.15.0
- React Icons - 5.5.0

### Backend

- Django Cors Headers - 4.7.0
- Django Rest Framework - 3.16.0
- Django Filter - 25.1
- PyMySQL - 1.1.1
- Dotenv - 0.9.9
- Simple JWT - 5.5.0

# Installation Process

## Database Setup

1. Import the dump file into a MySQL database:
   ```bash
   # Example using mysql command line (adjust as needed)
   mysql -u username -p database_name < dump_file.sql
   ```

## Backend Setup (Django)

Navigate to the `backend-django` directory and follow these steps:

1. Create a Python virtual environment (optional but recommended):

   ```bash
   python -m venv venv
   ```

2. Activate the virtual environment:

   - Windows: `venv\Scripts\activate`
   - Unix/MacOS: `source venv/bin/activate`

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the project directory following the `.env.example` template:

   ```
   DJANGO_SECRET="ajhskjfhalksjh1u2l34#$%%$#F45gj45f34F#$F@!"
   DB_NAME="investigadores"
   DB_USER="root"
   DB_PASSWORD="root"
   DB_HOST="localhost"
   DB_PORT=3306
   ```

   _Note: Replace the credentials with your own_

5. Run migrations:

   ```bash
   python ./manage.py makemigrations api
   python ./manage.py makemigrations
   python ./manage.py migrate
   ```

6. Start the backend server:
   ```bash
   python ./manage.py runserver
   ```
   The server will run at http://localhost:8000 by default.

## Frontend Setup (React)

Navigate to the `frontend-react` directory and follow these steps:

1. Create a `.env` file following the `.env.example` template:

   ```
   VITE_API_URL="http://localhost:8000/api"
   ```

2. Install npm packages:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the application in your browser using the link displayed in the terminal.

## Default Login Credentials

The system comes with two predefined users:

- Admin user:

  - Username: `admin`
  - Password: `root`

- Regular user:
  - Username: `jaime`
  - Password: `pollito`

# Database Diagram

![Database Diagram](https://github.com/user-attachments/assets/9a429603-e376-408e-8590-fed95bdb715e)

# Login

![Login Page](https://github.com/user-attachments/assets/7ed0bf3c-c469-4226-86f7-b6807a1a8590)

Our WebApp is secured with the use of JWTs to validate if the user is authenticated from the frontend before making any calls to the backend.

# Verbos HTTP

## GET - Obtener recursos

### Descripción

El método GET solicita una representación del recurso especificado. Las peticiones GET solo deben recuperar datos y no deben tener ningún otro efecto.

### Ejemplo en Postman

**Configuración básica:**

1. Selecciona `GET` en el dropdown de métodos
2. Introduce la URL: `https://api.ejemplo.com/usuarios`
3. Haz clic en "Send"

**Headers comunes:**

```
Accept: application/json
Authorization: Bearer {token}
```

**Ejemplo de respuesta (200 OK):**

```json
{
  "usuarios": [
    {
      "id": 1,
      "nombre": "Ana García",
      "email": "ana.garcia@ejemplo.com"
    },
    {
      "id": 2,
      "nombre": "Carlos Rodríguez",
      "email": "carlos.rodriguez@ejemplo.com"
    }
  ],
  "total": 2
}
```

### Caso de uso

Obtener una lista de usuarios, detalles de un producto, o cualquier consulta donde solo necesites leer información.

## POST - Crear recursos

### Descripción

El método POST envía datos al servidor para crear un nuevo recurso. Es el método más común para enviar datos a un servidor.

### Ejemplo en Postman

**Configuración básica:**

1. Selecciona `POST` en el dropdown de métodos
2. Introduce la URL: `https://api.ejemplo.com/usuarios`
3. Ve a la pestaña "Body"
4. Selecciona "raw" y "JSON"
5. Introduce el contenido:

```json
{
  "nombre": "María López",
  "email": "maria.lopez@ejemplo.com",
  "password": "contraseña123"
}
```

6. Haz clic en "Send"

**Headers comunes:**

```
Content-Type: application/json
Accept: application/json
Authorization: Bearer {token}
```

**Ejemplo de respuesta (201 Created):**

```json
{
  "id": 3,
  "nombre": "María López",
  "email": "maria.lopez@ejemplo.com",
  "createdAt": "2025-04-05T14:30:00Z"
}
```

### Caso de uso

Crear un nuevo usuario, publicar un comentario, subir un archivo o enviar datos de un formulario.

## PUT - Actualizar recursos

### Descripción

El método PUT reemplaza todas las representaciones actuales del recurso de destino con los datos enviados. Si el recurso no existe, puede crear uno nuevo.

### Ejemplo en Postman

**Configuración básica:**

1. Selecciona `PUT` en el dropdown de métodos
2. Introduce la URL: `https://api.ejemplo.com/usuarios/3`
3. Ve a la pestaña "Body"
4. Selecciona "raw" y "JSON"
5. Introduce el contenido:

```json
{
  "nombre": "María López Sánchez",
  "email": "maria.lopez.sanchez@ejemplo.com",
  "password": "nuevacontraseña456"
}
```

6. Haz clic en "Send"

**Headers comunes:**

```
Content-Type: application/json
Accept: application/json
Authorization: Bearer {token}
```

**Ejemplo de respuesta (200 OK):**

```json
{
  "id": 3,
  "nombre": "María López Sánchez",
  "email": "maria.lopez.sanchez@ejemplo.com",
  "updatedAt": "2025-04-05T15:45:00Z"
}
```

### Caso de uso

Actualizar un perfil de usuario completo, reemplazar un archivo o actualizar un recurso entero.

## DELETE - Eliminar recursos

### Descripción

El método DELETE elimina el recurso especificado.

### Ejemplo en Postman

**Configuración básica:**

1. Selecciona `DELETE` en el dropdown de métodos
2. Introduce la URL: `https://api.ejemplo.com/usuarios/2`
3. Haz clic en "Send"

**Headers comunes:**

```
Authorization: Bearer {token}
```

**Ejemplo de respuesta (204 No Content):**
_No body returned_

**Ejemplo de respuesta alternativa (200 OK):**

```json
{
  "message": "Usuario eliminado correctamente",
  "deleted": true,
  "id": 2
}
```

### Caso de uso

Eliminar un usuario, borrar un archivo o quitar un recurso del sistema.

## Criterios de Puntuación por Investigador

Cada investigador tiene asociados los siguientes componentes con su valor correspondiente:

### Estudiantes

- **Maestría**:
  - Activo: **1 punto**
  - Registrado pero desertó: **2 puntos**
  - Egresado: **3 puntos**
  - Titulado: **5 puntos**

- **Doctorado**:
  - Activo: **1 punto**
  - Registrado pero desertó: **3 puntos**
  - Egresado: **5 puntos**
  - Titulado: **8 puntos**

### Líneas de Investigación

- Línea de investigación con **reconocimiento institucional**: **5 puntos**  
  *Nota: Un investigador puede tener varias líneas, pero solo se consideran aquellas con reconocimiento institucional.*

### Proyectos

- En proceso: **3 puntos**
- Terminado: **7 puntos**
- Instalado en sitio: **10 puntos**

### Artículos

- En proceso: **3 puntos**
- Terminado: **5 puntos**
- Aceptado en una revista: **7 puntos**
- Publicado: **10 puntos**  
  *Nota: Solo aplica puntaje completo si el investigador es el primer autor; en otros casos solo se otorgan 3 puntos.*

### Materias

- Clase asignada: **5 puntos**

### Eventos

- Congreso como ponente: **3 puntos**
- Taller: **1 punto**
- Conferencia como ponente: **5 puntos**
- Diplomado: **3 puntos**
- Charla: **1 punto**


En nuestro Dashboard, dentro de "Home", podrás encontrar la gráfica principal donde se muestran todos los investigadores actuales y su puntuación.
Donde podrás filtrar por "Area".

![image](https://github.com/user-attachments/assets/acf51cae-c67c-402e-8208-5350a2915c7b)

Sí presionas sobre una barra de algún investigador, se mostrará otra gráfica, la cual tendrá el desglose de los puntos obtenidos por ese investigador.

![image](https://github.com/user-attachments/assets/f1bae9e9-8002-437b-baff-21a74424f3cf)




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

## Installation and Running with Docker

### Prerequisites
- Docker and Docker Compose installed on your machine.

### Steps to Run the Application

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd Researcher-Network-WebApp
   ```

2. **Create a `.env` File**
   Create a `.env` file in the root directory with the following variables:
   ```
   DJANGO_SECRET=your_django_secret
   DB_NAME=your_db_name
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=your_db_host
   DB_PORT=your_db_port
   ```

3. **Build and Run the Docker Containers**
   ```bash
   docker-compose up --build
   ```

4. **Access the Application**
   - Frontend: [http://localhost:80](http://localhost:80)
   - Backend API: [http://localhost:8000/api](http://localhost:8000/api)
   - Swagger Documentation: [http://localhost:8000/swagger](http://localhost:8000/swagger)
   - ReDoc Documentation: [http://localhost:8000/redoc](http://localhost:8000/redoc)


### Additional Information
- The backend is served using Gunicorn and the frontend is served using Nginx.
- All API endpoints are under `/api/`.
- A health check endpoint is available at `/health/`.

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




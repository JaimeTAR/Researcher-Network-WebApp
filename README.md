# Researcher Network Webapp

![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white) ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

### Collaborators

1. ###### Jaime Alfaro
2. ###### Arturo Gutiérrez

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

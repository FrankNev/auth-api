# auth-api

  

API REST de autenticación desarrollada con JavaScript (Node.js), Express y MongoDB (Local o Nube).

  
<br>
## Descripción

  

`auth-api` es un servidor backend que gestiona la autenticación y autorización de usuarios. Soporta autenticación tradicional mediante JWT y autenticación OAuth 2.0 con Google, manejo de sesiones, validación de datos, rate limiting y documentación interactiva con Swagger.

  
<br>
## Tecnologías y dependencias

  

| Paquete | Versión | Propósito en este proyecto |
<br>

| `express` | ^5.2.1 | Framework principal del servidor |

| `mongoose` | ^9.3.0 | ODM para MongoDB |

| `jsonwebtoken` | ^9.0.3 | Generación y verificación de tokens JWT |

| `bcryptjs` | ^3.0.3 | Hash seguro de contraseñas |

| `passport` | ^0.7.0 | Middleware de autenticación |

| `passport-google-oauth20` | ^2.0.0 | Autenticación OAuth 2.0 con Google |

| `express-session` | ^1.19.0 | Manejo de sesiones |

| `express-validator` | ^7.3.1 | Validación y sanitización de datos |

| `express-rate-limit` | ^8.3.1 | Protección contra abuso de endpoints |

| `cors` | ^2.8.6 | Configuración de Cross-Origin Resource Sharing |

| `dotenv` | ^17.3.1 | Gestión de variables de entorno |

| `swagger-jsdoc` | ^6.2.8 | Generación de documentación OpenAPI |

| `swagger-ui-express` | ^5.0.1 | Interfaz visual de la documentación |

  
<br>
## Estructura del proyecto

  

```
auth-api/
 |
├── src/ # Lógica principal de la aplicación
 |
├── server.js # Punto de entrada del servidor
 |
├── package.json # Dependencias y scripts
 |
└── .gitignore

```

  
<br>
## Requisitos previos

  

- Node.js v18 o superior

- MongoDB (local o instancia en la nube, ej. MongoDB Atlas)

  
<br>
## Instalación

  

1. Clona el repositorio:

```bash
git clone https://github.com/FrankNev/auth-api.git

cd auth-api

```

  

  2. Instala las dependencias:

```bash
npm install

```

  

3. Crea el archivo de variables de entorno:

```bash
cp .env.example .env

```

  
<br>
## Variables de entorno

  

Configura las siguientes variables en tu archivo `.env`:

  

```env
PORT=3000


# MongoDB
MONGODB_URI=mongodb://localhost:27017/auth-api

O para conectarse a MongoDB Atlas:
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<default-database>


# JWT
JWT_SECRET=tu_secreto_jwt
JWT_EXPIRES_IN=7d


# Google OAuth 2.0
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

```

  
<br>
## Uso

  

Inicia el servidor:

  

```bash
node  server.js

```

  

O con recarga automática:

  

```bash
npm  run  dev

```

  
<br>
## Endpoints



### Autenticación local



| Método | Ruta | Descripción |

|--------|------|-------------|

| `POST` | `/auth/register` | Registro de nuevo usuario |

| `POST` | `/auth/login` | Inicio de sesión, retorna JWT |

| `POST` | `/auth/logout` | Cierre de sesión |



### Autenticación con Google



| Método | Ruta | Descripción |

|--------|------|-------------|

| `GET` | `/auth/google` | Inicia el flujo OAuth con Google |

| `GET` | `/auth/google/callback` | Callback de Google tras autenticación |

| `GET` | `/auth/google/failure` | Redirecciona al usuario en caso de error al autenticar |

  

### Usuario



| Método | Ruta | Descripción |

|--------|------|-------------|

| `GET` | `/auth/profile` | Datos del usuario autenticado |
| `GET` | `/auth/admin` | Panel para administrador/es |
  
<br>
## Documentación

  

La API cuenta con documentación interactiva generada con Swagger. Una vez iniciado el servidor, se accede usando:

  

```
http://localhost:3000/api-docs

```

  
<br>
## Seguridad

  

- Las contraseñas se almacenan hasheadas con **bcryptjs**.

- Los endpoints están protegidos con **JWT** y/o sesiones mediante **Passport.js**.

- Se aplica **rate limiting** para prevenir ataques de fuerza bruta.

-  **CORS** configurado para controlar los orígenes permitidos.

  
<br>
## Autor

  

[FrankNev](https://github.com/FrankNev)
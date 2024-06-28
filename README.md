# fisiorely-api

API para el backend de fisiorely

## Instalación

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/diegojuarez25/fisiorely-api.git
   cd fisiorely-api
2. Instalar dependencias:
Asegúrate de tener Node.js y npm instalados. Luego, instala las dependencias ejecutando: npm install
Esto instalará todas las dependencias necesarias listadas en package.json.

3. Configurar variables de entorno:
Crea un archivo .env en el directorio raíz del proyecto y configura las variables de entorno necesarias. Por ejemplo:
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
Ajusta estas variables según tu configuración local.

4. Instalar cada dependencia por separado:
Para cada una de las dependencias y dependencias de desarrollo, puedes instalarlas individualmente. A continuación se muestran ejemplos de cómo instalar algunas de las dependencias principales:

1. @prisma/client:
npm install @prisma/client@latest
2. bcryptjs:
npm install bcryptjs
3. cors:
npm install cors
4. crypto-js:
npm install crypto-js
5. dotenv:
npm install dotenv
6. express:
npm install express
7. jsonwebtoken:
npm install jsonwebtoken
8. moment:
npm install moment
9. morgan:
npm install morgan
10. promise-mysql:
npm install promise-mysql
11. swagger-jsdoc:
npm install swagger-jsdoc
12. swagger-ui-express:
npm install swagger-ui-express
13. validator:
npm install validator

5. Instalar dependencias de desarrollo:
Para las dependencias de desarrollo, puedes instalarlas de la siguiente manera:

npm install --save-dev @types/bcryptjs @types/cors @types/express @types/jsonwebtoken @types/morgan @types/swagger-ui-express @types/validator concurrently nodemon prisma ts-node-dev typescript

Esto instalará todas las definiciones TypeScript y utilidades necesarias para el desarrollo.

6. Iniciar el servidor de desarrollo:

Para ejecutar el servidor API en modo de desarrollo con reinicios automáticos usando nodemon, ejecuta:

npm run dev

7. Compilar y ejecutar en producción:

Para compilar el proyecto y ejecutarlo en modo de producción, usa:

npm run build
npm start

Esto compilará los archivos TypeScript y luego iniciará el servidor en modo de producción.

---------------------------------------------------------------------------------
--------------------------------------------Dependencias--------------------------
-@prisma/client: ORM para la interacción con bases de datos.
-bcryptjs: Biblioteca para el hash de contraseñas.
-cors: Middleware para habilitar CORS (Compartir Recursos de Origen Cruzado).
-crypto-js: Biblioteca para funciones criptográficas.
-dotenv: Biblioteca para cargar variables de entorno desde un archivo .env.
-express: Marco de trabajo web para Node.js.
-jsonwebtoken: Biblioteca para generar tokens JSON Web (JWT).
-moment: Biblioteca para manipulación de fechas y horas.
-morgan: Middleware para registrar solicitudes HTTP en Node.js.
-promise-mysql: Cliente MySQL para Node.js con promesas.
-swagger-jsdoc: Genera documentación Swagger/OpenAPI a partir de comentarios JSDoc.
-swagger-ui-express: Middleware para servir Swagger UI.
-validator: Biblioteca para validación y saneamiento de cadenas.

----------------------------------------Dependencias de Desarrollo---------------
-@types/bcryptjs: Definiciones TypeScript para bcryptjs.
-@types/cors: Definiciones TypeScript para cors.
-@types/express: Definiciones TypeScript para express.
-@types/jsonwebtoken: Definiciones TypeScript para jsonwebtoken.
-@types/morgan: Definiciones TypeScript para morgan.
-@types/swagger-ui-express: Definiciones TypeScript para swagger-ui-express.
-@types/validator: Definiciones TypeScript para validator.
-concurrently: Utilidad para ejecutar múltiples scripts npm concurrentemente.
-nodemon: Utilidad que monitorea cambios y reinicia automáticamente el servidor.
-prisma: CLI de Prisma para migraciones y gestión de bases de datos.
-ts-node-dev: Entorno de ejecución TypeScript con reinicios automáticos.
-typescript: Lenguaje de programación TypeScript.

 
Este archivo `README.md` proporciona todas las instrucciones necesarias en español para configurar, instalar y ejecutar tu proyecto `fisiorely-api`, junto con información detallada sobre las dependencias y dependencias de desarrollo utilizadas. Autor Eduardo González Ortiz 





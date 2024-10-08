# Backend del Administrador de Tareas para Proyectos Empresariales

Este proyecto es el backend del administrador de tareas para proyectos empresariales. Está desarrollado con Node.js y TypeScript, utilizando una serie de tecnologías para garantizar seguridad, escalabilidad y eficiencia en la gestión de usuarios, autenticación, y tareas.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para el código JavaScript en el servidor.
- **TypeScript**: Superset de JavaScript que añade tipado estático.
- **Express**: Framework minimalista para construir aplicaciones web y APIs.
- **Express Validator**: Middleware para la validación de los datos de las solicitudes HTTP.
- **bcrypt**: Para el hash y la verificación segura de contraseñas.
- **CORS**: Middleware para habilitar CORS (Cross-Origin Resource Sharing).
- **dotenv**: Manejo de variables de entorno.
- **jsonwebtoken (JWT)**: Para la autenticación y generación de tokens de acceso seguros.
- **Mongoose**: Modelado de datos y conexión a MongoDB.
- **Morgan**: Middleware para registro de solicitudes HTTP.
- **Nodemailer**: Para el envío de correos electrónicos en el sistema.

## Requisitos

- **Node.js**: Versión 18.18.0 o superior.
- **MongoDB**: Base de datos NoSQL para el almacenamiento de datos.

## Instalación

Para instalar las dependencias del proyecto, ejecuta el siguiente comando en la raíz del backend:

```bash
npm install

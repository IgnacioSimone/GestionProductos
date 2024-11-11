# Proyecto Full Stack: Frontend (Angular) + Backend (Java Spring Boot)

Este proyecto consiste en una aplicación Full Stack que tiene dos componentes principales: un **frontend** desarrollado con **Angular** y un **backend** desarrollado con **Java** usando **Spring Boot**. Ambos servicios deben ser levantados por separado, ya que se ejecutan en diferentes entornos.

## Estructura del Proyecto

El proyecto se divide en dos carpetas:

- **frontend**: Contiene el código fuente de la aplicación en Angular.
- **backend**: Contiene el código fuente del servidor en Java, usando Spring Boot.

## Requisitos Previos

Asegúrate de tener las siguientes herramientas instaladas en tu máquina:

- **Node.js** y **npm** (para el frontend en Angular)
  - Puedes descargar Node.js desde [aquí](https://nodejs.org/).
- **Java 8 o superior** (para el backend en Spring Boot)
  - Descarga e instala Java desde [aquí](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) o usa una versión OpenJDK.
- **Maven** (para gestionar las dependencias y ejecutar el backend)
  - Puedes instalar Maven desde [aquí](https://maven.apache.org/).

## Levantar el Proyecto

### 1. Levantar el Frontend (Angular)

1. Navega a la carpeta `frontend`:

   ```bash
   cd frontend

Instala las dependencias del proyecto utilizando npm:

   ``bash
npm install

Ejecuta la aplicación de Angular en el servidor de desarrollo:

   `bash
npm start

La aplicación estará disponible en http://localhost:4200.

2. Levantar el Backend (Spring Boot)
Navega a la carpeta backend:

   `bash
cd backend

Instala las dependencias del proyecto utilizando Maven:

   `bash
mvn install

Ejecuta el proyecto Spring Boot:

   `bash
mvn spring-boot:run

El backend se levantará por defecto en http://localhost:8080.

Resumen de Puertos
Frontend (Angular): http://localhost:4200
Backend (Spring Boot): http://localhost:8080
Ambos servicios deben estar corriendo de manera simultánea para que la aplicación funcione correctamente.

Notas
Si se presentan problemas con las dependencias o el arranque del proyecto, asegúrate de tener las versiones correctas de Node.js, npm, Java y Maven instaladas.
El backend está diseñado para exponer APIs que serán consumidas por el frontend. Si el backend no está corriendo, el frontend no podrá interactuar correctamente con la aplicación.
Asegúrate de que no haya conflictos de puertos entre el frontend y el backend. Si es necesario, puedes modificar los puertos en las configuraciones de cada uno.
Contribuciones
Si deseas contribuir a este proyecto, por favor abre un pull request o envía un issue para discutir las mejoras o correcciones.

¡Gracias por usar este proyecto! Si tienes alguna pregunta, no dudes en abrir un issue en el repositorio.
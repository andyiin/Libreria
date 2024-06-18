# Librería
![Librería](https://i.postimg.cc/RhQrpbWK/librerialogo.png)

Puedes consultar toda la documentación completa en la [Wiki](https://github.com/iesgrancapitan-proyectos/202324daw-junio-libreria-andrea-andres/wiki).

## Descripción del proyecto
Librería web desarrollada como TFG para el ciclo superior de Desarrollo de Aplicaciones Web. Implementada con Next.js en el backend, React en el frontend y Tailwind CSS para estilos. Utiliza MongoDB como base de datos.


## Información sobre despliegue
<h3 id="prerrequisitos">1. Prerrequisitos</h3>

1. **Docker**: Asegúrate de tener Docker instalado en tu máquina. Puedes descargarlo e instalarlo desde la página [oficial de Docker](https://docs.docker.com/desktop/).
1. **Docker Compose**: Docker Compose generalmente se incluye con Docker Desktop. Si estás utilizando Linux, asegúrate de instalar Docker Compose por separado. Puedes seguir las [instrucciones oficiales de Docker Compose](https://docs.docker.com/compose/install/).

<h3 id="estructura-del-proyecto">2. Estructura del Proyecto</h3>

<h4 id="preparacion-entorno">2.1 Preparación del entorno</h4>

Asumimos que tu proyecto tiene la siguiente estructura de directorios:

```plaintext
/tu-proyecto
|-- /app
|   |-- (clona el repositorio del proyecto aquí)
|-- /db
|-- docker-compose.yml
```

Dentro de app, clona el repositorio de tu proyecto.

```bash
git clone <url-repositorio>
```

En el proyecto hay un `Dockerfile`, este por defecto hace uso de Node.js y usa el puerto 3000.

```yaml
FROM node:lts

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

Para arrancar este proyecto es recomendable tener un archivo `docker-compose.yml` en la raíz del proyecto con el siguiente contenido (esto es un ejemplo, puedes modificarlo según tus necesidades):

```yaml
services:
  node:
    container_name: node-proyecto
    build:
      context: ./app
      dockerfile: Dockerfile
    ports:
      - 3000:3000
    volumes:
      - ./src:/app
    networks:
      - proyecto
    depends_on:
      - mongo
  mongo:
    image: mongo:latest
    container_name: mongo-proyecto
    ports:
      - 27017:27017
    volumes:
      - ./db:/data/db
    networks:
      - proyecto
  mongo-express:
    container_name: mongo-express-proyecto
    image: mongo-express:latest
    ports:
      - 8081:8081
    depends_on:
      - mongo
    networks:
      - proyecto
    environment:
      - ME_CONFIG_MONGODB_SERVER=mongo-proyecto
      - ME_CONFIG_BASICAUTH_USERNAME=admin
      - ME_CONFIG_BASICAUTH_PASSWORD=admin
networks:
  proyecto:
    driver: bridge
```

Este archivo `docker-compose.yml` define tres servicios:

* **node**: Este servicio crea un contenedor a partir del archivo Dockerfile en la carpeta app. El contenedor se ejecuta en el puerto 3000 y se monta un volumen para que los cambios en el código se reflejen en tiempo real.
* **mongo**: Este servicio crea un contenedor de MongoDB en el puerto 27017 y se monta un volumen para persistir los datos.
* **mongo-express**: Este servicio crea un contenedor de Mongo Express en el puerto 8081. Mongo Express es una interfaz web para administrar MongoDB con interfaz gráfica. Las credenciales por defecto son admin/admin.

Dentro de `app` renombra el archivo `.env.local_example` a `.env.local` y modifica las variables de entorno según tus necesidades.

```plaintext
MONGODB_URI = mongodb://mongo:27017/tu-base-de-datos
SESSION_SECRET = tu-clave-secreta
```

* **MONGODB_URI** es la URL de conexión a la base de datos de MongoDB. En este caso, el nombre del host es `mongo` y el puerto es `27017`. Puedes cambiar el nombre de la base de datos a tu gusto.

* **SESSION_SECRET** es una clave secreta que se utiliza para firmar las cookies de sesión. Puedes generar una clave secreta aleatoria en línea o simplemente escribir una cadena de texto.

<h4 id="arrancar-proyecto">2.2 Arrancar el proyecto</h4>

Para arrancar el proyecto, simplemente ejecuta el siguiente comando en la raíz del proyecto:

```bash
docker compose up -d --build
```

Este comando creará y arrancará los contenedores definidos en el archivo `docker-compose.yml`. El flag `-d` indica que los contenedores se ejecutarán en segundo plano para poder seguir utilizando la terminal y el flag `--build` indica que se debe reconstruir la imagen del contenedor si es necesario.

Una vez que los contenedores estén arrancados, puedes acceder a la aplicación en `http://localhost:3000` y a Mongo Express en `http://localhost:8081`.

<h3 id="comandos-utiles">3. Comandos Útiles</h3>

* Parar todos los contenedores:

```bash
docker compose down
```

* Reiniciar los contenedores:

```bash
docker compose restart <nombre-contenedor>(opcional)
```

* Ver los logs de un contenedor:

```bash
docker compose logs [-f] <nombre-contenedor>
```

## Información sobre cómo usarlo
La aplicación consta de 3 perfiles: invitado, cliente y administrador.

Si quieres saber lo que puede hacer cada perfil consulta [Manual de usuario](https://github.com/iesgrancapitan-proyectos/202324daw-junio-libreria-andrea-andres/wiki/Manual_Usuario).

Para probar la aplicación como administrador puedes usar:

· Email: lourdes@gmail.com

· Contraseña: 12345

Para probar la aplicación como cliente puedes registrarte con tu propia cuenta o usar:

· Email: lectora13@gmail.com

· Contraseña: 12345


## Autores
* [a19sotean](https://github.com/a19sotean)

* [a19camoan](https://github.com/a19camoan)

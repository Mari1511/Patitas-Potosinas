# Patitas Potosinas

## Propósito

Patitas Potosinas es una plataforma web de adopción de perros en San Luis Potosí, México. Su objetivo es conectar a perritos rescatados de refugios locales con familias responsables, dar visibilidad a los perros rescatados, reducir el abandono y facilitar adopciones responsables.

> **Adopta, no compres.** Ninguna adopción tiene costo económico.

La aplicación incluye un **Control de visitas**: un servidor Node.js con Express que cuenta las visitas al sitio y las guarda en Redis. Todo se ejecuta en contenedores con Docker Compose, la imagen se publica en Docker Hub y GitHub Actions valida y publica cada cambio.

| Endpoint | Descripción |
|----------|-------------|
| `GET /` | Sitio web de Patitas Potosinas |
| `GET /health` | Estado de la aplicación (`{"status":"activo"}`) |
| `GET /api/visitas` | Incrementa y devuelve el contador de visitas guardado en Redis |

Si Redis no está disponible, `/api/visitas` responde con un error controlado (código 503) y la aplicación sigue funcionando.

---

## Requisitos

- [Node.js](https://nodejs.org/) 20 o superior y npm.
- [Docker](https://www.docker.com/) con Docker Compose.
- Una cuenta de [Docker Hub](https://hub.docker.com/).
- Git y una cuenta de GitHub.

---

## Comandos de ejecución

### Instalar dependencias y ejecutar las pruebas

```bash
npm install
npm test
```

### Ejecutar con Docker (solo la aplicación)

```bash
docker build -t control-visitas:v1 .
docker run -d --name visitas-web -p 3000:3000 control-visitas:v1
```

Abre **http://localhost:3000**. Sin Redis, el contador de visitas muestra un aviso de no disponible.

Para detener y eliminar el contenedor:

```bash
docker stop visitas-web
docker rm visitas-web
```

### Ejecutar con Docker Compose (aplicación + Redis)

```bash
docker compose up --build -d
docker compose ps
docker compose logs
```

Abre **http://localhost:3000** o **http://localhost:3000/api/visitas**: cada solicitud aumenta el contador.

Para detener los servicios:

```bash
docker compose down
```

### Publicar la imagen en Docker Hub

```bash
docker login
docker tag control-visitas:v1 USUARIO_DOCKERHUB/control-visitas:v1
docker push USUARIO_DOCKERHUB/control-visitas:v1
```

---

## Integrantes

- Aguilera Casas Fernando
- Padrón Cruz Mariana
- Roque González Edgar Saúl

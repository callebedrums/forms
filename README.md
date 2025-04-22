# Form

Repository to store a Form application.

Frontend implemented as a SPA with Vue.js

Backend implemented as a REST API with Fastify

## Environment

- node v22.14.0
- npm 10.9.2
- docker (for local testing)

## Running locally

1. install dependencies for each project (backend and frontend)

```bash
# example for backend project. the same applies to the frontend
cd ./backend
npm install
```

2. execute the project

```bash
npm run dev
```

3. stop execution

```bash
CTRL + D
```

## Running using Docker (local test)

1. install dependencies and build each project

```bash
# example for backend project. the same applies to the frontend
cd ./backend
npm install
npm run build
```

2. run docker compose

```bash
docker compose up --build
```

access application at [http://localhost:8000](http://localhost:8000)

3. tear down docker environment after testing

```bash
CTRL + D
docker compose down
```

it will stop and remove the docker containers
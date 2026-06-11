# Email Backend

REST API для модульного drag-and-drop редактора писем.

## Стек

- NestJS + TypeScript
- PostgreSQL (Docker local / Neon production)
- TypeORM
- Docker multi-stage build

## Variables de entorno

```env
STAGE=dev

DB_USERNAME=postgres
DB_PASSWORD=MySecr3tPassWord@as2
DB_NAME=TesloDB
DB_HOST=db          # nombre del servicio en docker-compose
DB_PORT=5432

PORT=3000
HOST_API=http://localhost:3000/api
CORS_ORIGIN=http://localhost:5173
```

| Variable | Descripción |
|----------|-------------|
| `STAGE` | `dev` → sync schema; `prod` → sin auto-sync |
| `DB_HOST` | `db` en Docker; `localhost` en dev local; host Neon en Render |
| `HOST_API` | URL pública del API (con `/api`) |
| `CORS_ORIGIN` | Origen del frontend (coma para varios) |

SSL a Postgres se activa automáticamente cuando `DB_HOST` no es `localhost` ni `db`.

## Desarrollo local

### Solo base de datos (API con `npm run start:dev`)

```bash
cp .env.example .env   # DB_HOST=localhost
docker compose up -d db
npm install
npm run start:dev
```

### Stack completo en Docker

```bash
docker compose up -d --build
```

API: `http://localhost:3000/api/health`

## Render (Docker)

1. **New → Web Service → Docker**
2. **Root Directory:** `email-backend`
3. Render detecta el `Dockerfile` automáticamente
4. **Health Check Path:** `/api/health`
5. Variables en el dashboard:

```env
STAGE=prod
DB_HOST=ep-xxxx-pooler.region.aws.neon.tech
DB_PORT=5432
DB_USERNAME=neondb_owner
DB_PASSWORD=...
DB_NAME=neondb
PORT=3000
HOST_API=https://tu-backend.onrender.com/api
CORS_ORIGIN=https://tu-frontend.netlify.app
```

## Endpoints (prefijo `/api`)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/templates` | Lista de plantillas |
| GET | `/api/templates/:id` | Plantilla por id |
| POST | `/api/templates` | Crear plantilla |
| PUT | `/api/templates/:id` | Actualizar plantilla |
| DELETE | `/api/templates/:id` | Eliminar plantilla |
| GET | `/api/widgets` | Lista de widgets |
| GET | `/api/widgets/:id` | Widget por id |
| POST | `/api/widgets` | Registrar metadata de widget |
| POST | `/api/widgets/qr/generate` | QR (data URL) |
| POST | `/api/export/html` | Exportar HTML |
| POST | `/api/preview` | Preview HTML |
| GET | `/api/products/random?count=2` | Productos aleatorios |

Respuestas: `{ "data": ... }`.

## Tests

```bash
npm test          # unit
npm run test:e2e  # integration (supertest)
```

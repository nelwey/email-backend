# Email Backend

REST API для модульного drag-and-drop редактора писем.

## Стек

- NestJS + TypeScript
- PostgreSQL (Docker локально / Neon в production)
- TypeORM

## Быстрый старт

```bash
# 1. PostgreSQL в Docker
docker compose up -d

# 2. Переменные окружения
cp .env.example .env

# 3. Запуск API
npm install
npm run start:dev
```

API: `http://localhost:3000`

## Эндпоинты

| Метод | Путь | Описание |
|-------|------|----------|
| GET | `/health` | Проверка сервиса |
| GET | `/templates` | Список шаблонов |
| GET | `/templates/:id` | Шаблон по id |
| POST | `/templates` | Создать шаблон |
| PUT | `/templates/:id` | Обновить шаблон |
| DELETE | `/templates/:id` | Удалить шаблон |
| GET | `/widgets` | Список виджетов |
| GET | `/widgets/:id` | Виджет по id |
| POST | `/widgets` | Зарегистрировать виджет |
| POST | `/widgets/qr/generate` | QR-изображение (data URL) |
| POST | `/export/html` | Экспорт HTML |
| POST | `/preview` | Предпросмотр HTML |
| GET | `/products/random?count=2` | Случайные товары |

## Production (Render + Neon)

Установите `DATABASE_URL` в Render и отключите синхронизацию схемы:

```
DATABASE_URL=postgresql://...
TYPEORM_SYNC=false
NODE_ENV=production
CORS_ORIGIN=https://your-frontend.onrender.com
```

## Интеграция с frontend

Тело экспорта / предпросмотра:

```json
{
  "subject": "Новая рассылка",
  "blocks": [
    { "id": "uuid", "type": "text", "props": { "content": "Привет!", "align": "left" } }
  ]
}
```

Ответы обёрнуты в `{ "data": ... }`.

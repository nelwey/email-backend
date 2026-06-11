# --- build stage ---
FROM node:20-bookworm-slim AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# better-sqlite3 is dev-only (e2e tests) and needs native compile — skip in Docker
RUN npm ci --ignore-scripts

COPY . .
RUN npm run build

RUN npm prune --omit=dev

# --- runtime stage ---
FROM node:20-bookworm-slim

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]

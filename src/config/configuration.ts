const DEFAULT_PORT = 3000;

function resolveNodeEnv(stage: string): 'development' | 'production' | 'test' {
  if (stage === 'prod' || stage === 'production') return 'production';
  if (stage === 'test') return 'test';
  return 'development';
}

function isLocalDbHost(host: string): boolean {
  return host === 'localhost' || host === 'db' || host === '127.0.0.1';
}

export default () => {
  const stage = process.env.STAGE ?? 'dev';
  const port = parseInt(process.env.PORT ?? String(DEFAULT_PORT), 10);
  const dbHost = process.env.DB_HOST ?? 'localhost';

  return {
    stage,
    nodeEnv: resolveNodeEnv(stage),
    port,
    hostApi:
      process.env.HOST_API ?? `http://localhost:${port}/api`,
    corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
    database: {
      host: dbHost,
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USERNAME ?? 'postgres',
      password: process.env.DB_PASSWORD ?? '',
      database: process.env.DB_NAME ?? 'TesloDB',
      ssl: !isLocalDbHost(dbHost),
      synchronize: stage === 'dev',
      logging: process.env.DB_LOGGING === 'true',
    },
  };
};

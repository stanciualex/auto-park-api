module.exports = {
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 28015,
    db: process.env.DB_NAME || 'autoPark',
  },
  app: {
    port: process.env.PORT || 80,
    token: process.env.TOKEN_SECRET || 'mysupersecretcooltoken',
  },
  domain: {
    web: process.env.WEB_DOMAIN || 'http://localhost:3000',
    api: process.env.API_DOMAIN || 'http://localhost:8000'
  }
};
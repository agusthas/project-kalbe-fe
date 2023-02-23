export default () => ({
  app: {
    port: parseInt(process.env.APP_PORT, 10) || 3001,
    host: process.env.APP_HOST || 'localhost',
    url: process.env.APP_URL || 'http://localhost:3001',
  },
});

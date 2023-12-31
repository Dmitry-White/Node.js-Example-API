const config = {
  client: {
    url: process.env.CLIENT_URL || 'http://example.com',
    headers:
      process.env.CLIENT_HEADERS ||
      'Origin, X-Requested-With, Content-Type, Accept',
    methods:
      process.env.CLIENT_METHODS || 'GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE',
    spec: 'application/vnd.api+json',
  },
  server: {
    port: process.env.PORT || 5000,
    jwtsecret: process.env.JWT_SECRET || 'qwerty123',
    jwtttl: process.env.JWT_TTL || '7d',
  },
  logs: {
    service: 'node-example-api',
    format: process.env.LOG_FORMAT || 'dev',
    level: process.env.LOG_LEVEL || 'info',
    logfile: process.env.LOG_FILE || 'logs/combined.log',
    errlog: process.env.ERR_LOG || 'logs/error.log',
  },
  db: {
    host: process.env.DATABASE_HOST || 'task-db',
    name: process.env.DATABASE_NAME || 'task',
    user: process.env.DATABASE_USER || 'tester',
    password: process.env.DATABASE_PASSWORD || 'qwerty',
    uri: process.env.DATABASE_URI || 'mysql://tester:qwerty@task-db:3306/task',
  },
};

export default config;

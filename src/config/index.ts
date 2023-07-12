const config = {
  port: process.env.PORT || 5000,
  client: {
    url: process.env.CLIENT_URL || 'http://example.com',
    headers:
      process.env.CLIENT_HEADERS ||
      'Origin, X-Requested-With, Content-Type, Accept',
    methods:
      process.env.CLIENT_METHODS || 'GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE',
  },
  logs: {
    service: 'node-example-api',
    format: process.env.LOG_FORMAT || 'dev',
    level: process.env.LOG_LEVEL || 'info',
    logfile: process.env.LOG_FILE || 'logs/combined.log',
    errlog: process.env.ERR_LOG || 'logs/error.log',
  },
  db: {
    uri: process.env.DATABASE_URI || 'mysql://tester:qwerty@task-db:3306/task',
  },
};

export default config;

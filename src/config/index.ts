const config = {
  port: process.env.PORT || 5000,
  logs: {
    service: 'node-example-api',
    format: process.env.LOG_FORMAT || 'dev',
    level: process.env.LOG_LEVEL || 'info',
    logfile: process.env.LOG_FILE || 'combined.log',
    errlog: process.env.ERR_LOG || 'error.log',
  },
};

export default config;

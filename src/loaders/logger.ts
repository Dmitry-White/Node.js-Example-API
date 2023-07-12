import winston from 'winston';

import config from '../config';

const logMetadata = {
  service: config.logs.service,
  timestamp: new Date(),
};

const logfileTransport = new winston.transports.File({
  filename: config.logs.logfile,
});

const errlogTransport = new winston.transports.File({
  filename: config.logs.errlog,
  level: 'error',
});

const logger = winston.createLogger({
  level: config.logs.level,
  format: winston.format.json(),
  defaultMeta: logMetadata,
  transports: [errlogTransport, logfileTransport],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.json(),
    })
  );
}

export default logger;

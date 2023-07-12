import morgan from 'morgan';

import config from '../config';

const morganMiddleware = morgan(config.logs.format);

export default morganMiddleware;

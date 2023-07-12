import cors from 'cors';

import config from '../config';

const corsOption = {
  origin: [config.client.url],
  methods: config.client.methods,
  credentials: true,
};
const corsMiddleware = cors(corsOption);

export default corsMiddleware;

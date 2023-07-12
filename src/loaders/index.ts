import {ExpressLoader} from '../types';
import expressLoader from './express';

const rootLoader = async ({app}: ExpressLoader) => {
  expressLoader({app});
};

export default rootLoader;

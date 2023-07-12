import {RootLoader} from '../types';
import expressLoader from './express';

const rootLoader = async ({app}: RootLoader) => {
  expressLoader({app});
};

export default rootLoader;

import {RootLoader} from '../types';

import {dbLoader} from './db';
import expressLoader from './express';

const rootLoader = async ({app}: RootLoader) => {
  await dbLoader();

  expressLoader({app});
};

export default rootLoader;

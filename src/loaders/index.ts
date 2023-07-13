import {RootLoader} from '../types';

import {dbLoader} from './db';
import {rbacLoader} from './rbac';
import expressLoader from './express';

const rootLoader = async ({app}: RootLoader) => {
  await dbLoader();
  await rbacLoader();

  expressLoader({app});
};

export default rootLoader;

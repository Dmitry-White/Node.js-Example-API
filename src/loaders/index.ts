import {RootLoader} from '../types';

import {dbLoader} from './db';
import {rbacLoader} from './rbac';
import expressLoader from './express';
import {jsonApiLoader} from './jsonApi';

const rootLoader = async ({app}: RootLoader) => {
  await dbLoader();
  await rbacLoader();

  jsonApiLoader();

  expressLoader({app});
};

export default rootLoader;

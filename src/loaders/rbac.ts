const {RBAC} = require('rbac');

import {Assets, Permissions, Roles} from '../types';

const policy = new RBAC({
  roles: [Roles.ADMIN, Roles.USER],
  permissions: {
    [Assets.USER]: [
      Permissions.CREATE,
      Permissions.LIST,
      Permissions.GET_SINGLE,
      Permissions.UPDATE_SINGLE,
      Permissions.DESTROY,
    ],
  },
  grants: {
    [Roles.USER]: [
      `${Permissions.GET_SINGLE}_${Assets.USER}`,
      `${Permissions.UPDATE_SINGLE}_${Assets.USER}`,
    ],
    [Roles.ADMIN]: [
      Roles.USER,
      `${Permissions.CREATE}_${Assets.USER}`,
      `${Permissions.LIST}_${Assets.USER}`,
      `${Permissions.DESTROY}_${Assets.USER}`,
    ],
  },
});

const rbacLoader = async () => await policy.init();

export {policy, rbacLoader};

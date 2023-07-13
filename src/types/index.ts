import {Application} from 'express';

interface RootLoader {
  app: Application;
}

const enum Roles {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

const enum Assets {
  USER = 'user',
}

const enum Permissions {
  CREATE = 'create',
  GET_SINGLE = 'getSingle',
  UPDATE_SINGLE = 'updateSingle',
  LIST = 'list',
  DESTROY = 'destroy',
}

export {RootLoader, Roles, Assets, Permissions};

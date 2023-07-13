import JSONAPISerializer from 'json-api-serializer';

import {Assets} from '../types';

const jsonApiSerializer = new JSONAPISerializer({
  convertCase: 'kebab-case',
  unconvertCase: 'camelCase',
  convertCaseCacheSize: 0,
});

const jsonApiUserSchema = {
  id: 'id',
  blacklist: ['password', 'role', 'access_token'],
  links: {
    self: (data: unknown) => {
      return `/${Assets.USER}/` + (data as {id: string}).id;
    },
  },
  topLevelLinks: {
    self: () => {
      return `/${Assets.USER}`;
    },
  },
};

const jsonApiAuthSchema = {
  id: 'id',
  links: {
    self: () => {
      return `/${Assets.AUTH}`;
    },
  },
  topLevelLinks: {
    self: () => {
      return `/${Assets.AUTH}`;
    },
  },
  relationships: {
    user: {
      type: Assets.USER,
    },
  },
};

const jsonApiErrorSchema = {
  id: 'id',
};

const jsonApiLoader = () => {
  jsonApiSerializer.register(Assets.USER, jsonApiUserSchema);
  jsonApiSerializer.register(Assets.AUTH, jsonApiAuthSchema);
  jsonApiSerializer.register(Assets.ERROR, jsonApiErrorSchema);
};

export {jsonApiSerializer, jsonApiLoader};

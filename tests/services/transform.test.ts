import TransformService from '../../src/services/transform';
import logger from '../../src/loaders/logger';
import {jsonApiSerializer, jsonApiLoader} from '../../src/loaders/jsonApi';
import {Assets} from '../../src/types';

const serializeInputMock = {
  id: 1,
  name: 'Test4',
  email: 'test4@example.com',
  password: 'qwerty123',
};

const serializeOutputMock = {
  jsonapi: {
    version: '1.0',
  },
  links: {
    self: '/user',
  },
  data: {
    id: '1',
    type: 'user',
    links: {
      self: '/user/1',
    },
    attributes: {
      name: 'Test4',
      email: 'test4@example.com',
    },
    meta: undefined,
    relationships: undefined,
  },
  meta: undefined,
  included: undefined,
};

const deserializeInputMock = {
  jsonapi: {
    version: '1.0',
  },
  links: {
    self: '/user',
  },
  data: {
    id: '1',
    type: 'user',
    attributes: {
      name: 'Test4',
      email: 'test4@example.com',
      password: 'qwerty123',
    },
  },
};

const deserializeOutputMock = {
  id: '1',
  name: 'Test4',
  email: 'test4@example.com',
  password: 'qwerty123',
};

describe('TransformService', () => {
  let transformService: TransformService;

  beforeAll(() => {
    jsonApiLoader();
  });

  beforeEach(() => {
    transformService = new TransformService(jsonApiSerializer, logger);
  });
  describe('Serialize', () => {
    it('should run', async () => {
      const actual = await transformService.serialize(
        Assets.USER,
        serializeInputMock
      );
      const expected = serializeOutputMock;

      expect(actual).toEqual(expected);
    });
  });
  describe('Deserialize', () => {
    it('should run', async () => {
      const actual = await transformService.deserialize(
        Assets.USER,
        deserializeInputMock
      );
      const expected = deserializeOutputMock;

      expect(actual).toEqual(expected);
    });
  });
});

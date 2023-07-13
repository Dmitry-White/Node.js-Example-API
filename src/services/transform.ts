import JSONAPISerializer from 'json-api-serializer';

import Logger from '../types/logger';

class TransformService {
  serializer: JSONAPISerializer;
  logger: Logger;
  dataHeader: {
    [key: string]: string;
  };

  constructor(serializer: JSONAPISerializer, logger: Logger) {
    this.serializer = serializer;
    this.logger = logger;
    this.dataHeader = {
      'Content-Type': 'application/vnd.api+json',
    };
  }

  async serialize(
    type: string,
    data: object
  ): Promise<JSONAPISerializer.JSONAPIDocument> {
    const serialData = await this.serializer.serializeAsync(type, data);
    return serialData;
  }

  async deserialize(
    type: string,
    data: JSONAPISerializer.JSONAPIDocument
  ): Promise<unknown> {
    const deserialData = await this.serializer.deserializeAsync(type, data);
    return deserialData;
  }
}

export default TransformService;

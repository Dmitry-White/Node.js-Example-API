import {Roles} from '.';

type UserShape = {
  id: number | string;
  name: string;
  email: string;
  password: string;
  role: Roles;
  access_token: string;
};

type BaseDTO = {
  email: string;
  password: string;
};

type UserDTO = BaseDTO & {
  name: string;
};

export {UserShape, BaseDTO, UserDTO};

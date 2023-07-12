type UserShape = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'USER' | 'ADMIN';
  access_token: string;
};

type BaseDTO = {
  email: string;
  password: string;
};

type UserDTO = BaseDTO & {
  name: string;
};

type UserOutput = UserShape | null;
type UsersOutput = UserShape[] | null;

export {UserShape, BaseDTO, UserDTO, UserOutput, UsersOutput};

import {sequelize} from '../loaders/db';
import UserModel from '../models/user';

const User = UserModel(sequelize);

sequelize.sync();

export {User};

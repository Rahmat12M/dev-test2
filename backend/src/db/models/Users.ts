import { DataTypes, Model, type InferAttributes, type InferCreationAttributes } from 'sequelize';
import db from '@/db/db';

class Users extends Model<
  InferAttributes<Users>,
  InferCreationAttributes<Users>
> {
  [x: string]: any;
  declare username: string;
  declare password: string;
}

Users.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: db,
    tableName: 'users',
    modelName: 'Users'
  }
);

// Relationen zu Buechern.
// Ein Benutzer kann viele Buecher haben. Ein Buch gehoert zu einem Benutzer.

export default Users;
import { DataTypes, Model, type InferAttributes, type InferCreationAttributes } from 'sequelize';
import db from '@/db/db';

class Books extends Model<
  InferAttributes<Books>,
  InferCreationAttributes<Books>
> {
  [x: string]: any;
  declare name: string;
  declare isbn: string;
  declare author: string;
}

Books.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: db,
    tableName: 'books',
    modelName: 'Books'
  }
);

export default Books;
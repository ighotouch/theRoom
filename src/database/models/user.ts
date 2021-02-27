/* eslint-disable no-param-reassign */
import bcrypt from "bcryptjs";
import {
  Sequelize,
  Model,
  DataTypes,
  Optional,
} from "sequelize";


export interface IUserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IUserCreationAttributes extends Optional<IUserAttributes, 'id'> {};

interface UserInstance
  extends Model<IUserAttributes, IUserCreationAttributes>,
    IUserAttributes {}


const UserModel= (sequelize: Sequelize) => {
  const User  = sequelize.define<UserInstance>(
    "User",
    {
      id: {
        allowNull: true,
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      firstName: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      lastName: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      email: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "users",
    }
  );

  User.addHook("beforeCreate", async (user) => {
    const salt = bcrypt.genSaltSync(10);
    const pass = await bcrypt.hash(
      user.getDataValue('password'),
      salt
    );
    user.setDataValue('password',pass)
  });

  User.addHook("beforeUpdate", async (user) => {
    const salt = bcrypt.genSaltSync(10);
    const pass = await bcrypt.hash(
      user.getDataValue('password'),
      salt
    );
    user.setDataValue('password',pass)
  });

  User.prototype.validatePassword = function validatePassword(passwordInput: string) {
    return bcrypt.compare(passwordInput, this.dataValues.password);
  };

  return User;
};

export default UserModel;

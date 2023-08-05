import { Sequelize, Model, DataTypes } from "sequelize";
import { sequelize } from ".";

interface UserAttributes {
  id: number;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  password: string;
}

export class userModel extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public password!: string;
}

userModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);

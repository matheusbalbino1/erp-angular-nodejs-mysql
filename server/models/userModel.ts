import { Sequelize, Model, DataTypes } from "sequelize";
import exec from "child_process";

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

const sequelize = new Sequelize("erp", "root", "password", {
  dialect: "mysql",
  host: "database",
});

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

const authenticate = async () => {
  try {
    await sequelize.authenticate();

    exec.exec("sequelize db:migrate", (error) => {
      if (error) {
        console.error("Migrations not performed!");
        return;
      }
      console.log("Migrations performed!");
    });
  } catch (err) {
    setTimeout(() => {
      console.log("Try to reconnect to the database...");
      authenticate();
    }, 10000);
  }
};

authenticate();

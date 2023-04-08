import Sequelize from "sequelize";
import exec from "child_process";

const db = new Sequelize.Sequelize("erp", "root", "password", {
  host: "database",
  dialect: "mysql",
  port: 3306,
  database: "erp",
});

export const userModel = db.define("users", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const authenticate = async () => {
  try {
    await db.authenticate();

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

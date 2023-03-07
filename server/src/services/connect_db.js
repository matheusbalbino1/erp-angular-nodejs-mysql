const Sequelize = require("sequelize");
const MYSQL_ROOT_PASSWORD = process.env.MYSQL_ROOT_PASSWORD || "password";

const database = new Sequelize("inventory", "root", MYSQL_ROOT_PASSWORD, {
  dialect: "mysql",
  host: "localhost",
  port: 3306,
});

const synchronize = async () => {
  try {
    await database.sync();
    console.log("Database synchronized");
  } catch (err) {
    console.log(err);
  }
};
synchronize();

module.exports = database;

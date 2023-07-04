import { Sequelize } from "sequelize";
import exec from "child_process";

export const sequelize = new Sequelize("erp", "root", "password", {
  dialect: "mysql",
  host: "database",
});

const authenticate = async () => {
  try {
    await sequelize.authenticate();

    exec.exec("npx sequelize-cli db:migrate", (error) => {
      if (error) {
        console.log("######################################################");
        console.log(error);
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

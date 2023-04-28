import { Request, Response } from "express";
import { userModel } from "../../../models/userModel";
import {
  IUserCreate,
  IUserDelete,
  IUserShow,
  IUserUpdate,
} from "../interfaces/IUser";

class UserControllers {
  async index(request: Request, response: Response) {
    try {
      const users = await userModel.findAll();
      response.status(200).json({ status: "sucess", message: users });
    } catch (error) {
      response.status(404).json({ status: "error", message: error?.message });
    }
  }

  async create(request: Request<{}, {}, IUserCreate>, response: Response) {
    try {
      const created_user = await userModel.findOrCreate({
        where: { username: request.body.username },
        defaults: {
          username: request.body.username,
          password: request.body.password,
        },
      });

      if (!created_user[1]) throw new Error("User already exists!");

      response.status(200).json({ status: "sucess", message: created_user[0] });
    } catch (error) {
      response.status(400).json({ status: "error", message: error?.message });
    }
  }

  async show(request: Request<IUserShow>, response: Response) {
    try {
      const found_user = await userModel.findOne({
        where: { id: request.params.id },
      });

      if (!found_user) throw new Error("User not found!");

      response.status(200).json({ status: "sucess", message: found_user });
    } catch (error) {
      response.status(404).json({ status: "error", message: error?.message });
    }
  }

  async update(
    request: Request<IUserUpdate, {}, IUserCreate>,
    response: Response
  ) {
    try {
      const find_user = await userModel.findOne({
        where: { id: request.params.id },
      });

      if (!find_user) throw new Error("User not found!");
      await userModel.update(
        { username: request.body?.username, password: request.body?.password },
        { where: { id: request.params.id } }
      );

      const updated_user = await userModel.findOne({
        where: { id: request.params.id },
      });

      response.status(200).json({ status: "sucess", message: updated_user });
    } catch (error) {
      response.status(400).json({ status: "error", message: error?.message });
    }
  }

  async delete(request: Request<IUserDelete>, response: Response) {
    try {
      const find_user = await userModel.findOne({
        where: { id: request.params.id },
      });

      if (!find_user) throw new Error("User not found!");

      await userModel.destroy({ where: { id: request.params.id } });

      response.status(200).json({ status: "sucess" });
    } catch (error) {
      response.status(400).json({ status: "error", message: error?.message });
    }
  }
}

export default UserControllers;

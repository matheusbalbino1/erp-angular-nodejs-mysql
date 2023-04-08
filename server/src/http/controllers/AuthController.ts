import { Request, Response } from "express";
import { userModel } from "../../../models/userModel";
import { IUserCreate, IUserShow } from "../interfaces/IUser";
import jwt from "jsonwebtoken";

const ASSING_JWT = process.env.ASSIGN_JWT || "password";

class AuthController {
  async login(request: Request<{}, {}, IUserCreate>, response: Response) {
    try {
      const getUser = await userModel.findOne({
        where: {
          username: request.body.username,
          password: request.body.password,
        },
      });
      if (!getUser) throw new Error("User not found!");

      const token = jwt.sign({ id: getUser.id }, ASSING_JWT, {
        expiresIn: 300,
      });

      return response.status(200).json({ status: "sucess", message: token });
    } catch (error) {
      response.status(400).json({ status: "error", message: error?.message });
    }
  }

  async logout(request: Request<IUserShow>, response: Response) {
    response.status(200).json({ status: "sucess", message: "Logout" });
  }
}

export default AuthController;

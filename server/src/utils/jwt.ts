import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const ASSIGN_JWT = process.env.ASSIGN_JWT || "password";

export function verifyToken(
  req: Request<any, any>,
  res: Response,
  next: NextFunction
) {
  try {
    const bearerHeader = req.headers["authorization"];
    const bearerToken: string = bearerHeader.split(" ")[1];
    jwt.verify(bearerToken, ASSIGN_JWT, (err: any, authData: any) => {
      if (err)
        return res
          .status(401)
          .json({
            status: "error",
            message: "The token is invalid",
          })
          .end();

      req.userId = authData.id;
      next();
    });
  } catch (err) {
    res
      .status(403)
      .json({
        status: "error",
        message: "The 'authorization' is missing",
      })
      .end();
  }
}

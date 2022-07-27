import jwt from "jsonwebtoken";
import config from "config";
import { NextFunction, Request, Response } from "express";

export const generateToken = (email: string) => {
  return jwt.sign({ email }, config.get("jwtSecret"), {
    expiresIn: config.get("jwtExpiration"),
  });
};
export const authMiddleware =
  (params: { ignoredRoutes: string[] }) =>
  (req: Request, res: Response, next: NextFunction) => {
  if (params.ignoredRoutes.includes(req.path)) {
      return next();
    }
    const authHeader = req.headers["authorization"];
    if (authHeader == undefined) {return res.status(401).send()};
    jwt.verify(authHeader, config.get("jwtSecret"), (err: any, data: any) => {
      if (err) {return res.status(403).send()};
      req.headers["email"] = data.email;
      next();
    });
  };

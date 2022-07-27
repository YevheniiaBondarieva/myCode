import { Request, Response } from "express";

export const errorHandler = <T>(
  controller: (req: Request) => Promise<T | undefined>
) => {
  return async (req: Request, res: Response) => {
    try {
      const results = await controller(req);
      res.status(200).json({ results });
    } catch (err) {
      res.status(400).json({ status: "fail", message: err });
      console.log(err)
    }
  };
};

import { NextFunction, Request, Response } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    res.render("bankrupt");
  } catch (err) {
    next(err);
  }
};

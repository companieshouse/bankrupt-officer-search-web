import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const bankruptOfficer = [];

    res.render("bankrupt_officer", { bankruptOfficer });
  } catch (err) {
    next(err);
  }
};

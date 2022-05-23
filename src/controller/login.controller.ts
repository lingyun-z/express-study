import { Response, NextFunction } from "express";
import { Request } from "../types";

const login = (req: Request, res: Response, next: NextFunction) => {
  const { userName } = req.body;
  req.session.regenerate((err) => {
    if (err) next(err);
    req.session.user = { userName };
    res.status(200).json({ userName });
  });
};

export default { login };

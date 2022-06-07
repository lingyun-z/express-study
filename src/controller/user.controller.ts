import { NextFunction, Request, Response } from "express";
import "../types";
import { ErrorTypeEnum } from "../types/errorMap";

const currentUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.session.user;
    if (!user) {
      throw new Error(ErrorTypeEnum.UNAUTHORIZED);
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export default { currentUser };

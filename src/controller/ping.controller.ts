import { Response, Request, NextFunction } from "express";

const ping = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.session.id);
    res.status(200).json("pong");
  } catch (error) {
    next(error);
  }
};

export default { ping };

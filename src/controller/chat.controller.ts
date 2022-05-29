import { Response, NextFunction } from "express";
import { socketUserService } from "../service";
import { Request } from "../types";

const getOnlineUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await socketUserService.getOnlineUsers();

    res.status(200).json({
      users,
    });
  } catch (error) {
    next(error);
  }
};

export default { getOnlineUsers };

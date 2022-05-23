import { Response, NextFunction } from "express";
import chatService from "../service/chatService";
import { Request } from "../types";

const getOnlineUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await chatService.getOnlineUsers();

    res.status(200).json({
      users,
    });
  } catch (error) {
    next(error);
  }
};

export default { getOnlineUsers };

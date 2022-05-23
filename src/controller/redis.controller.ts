import { Response, Request, NextFunction } from "express";
import redisUtil from "../lib/redisUtils";

const add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { key, id } = req.params;
    const maxSpots = 10;
    await redisUtil.set(key, "0", 1000 * 60);
    const result = await redisUtil.incr(key);
    if (result > maxSpots) {
      await redisUtil.decr(key);
      res.status(503).json("failed");
    } else {
      res.status(200).json("pong");
    }
  } catch (error) {
    next(error);
  }
};

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { key } = req.params;
    const availableSpots = await redisUtil.get(key);

    res.status(200).json({ spot: availableSpots });
  } catch (error) {
    next(error);
  }
};

const flushAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await redisUtil.flushAll();

    res.status(200).json({ status: "success" });
  } catch (error) {
    next(error);
  }
};

export default { add, get, flushAll };

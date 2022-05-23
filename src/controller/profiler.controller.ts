import * as profiler from "v8-profiler-next";
import { Response, Request, NextFunction } from "express";
import * as fs from "fs";
const cupProfiler = (req: Request, res: Response, next: NextFunction) => {
  try {
    profiler.startProfiling("CPU profile");

    setTimeout(() => {
      const profile = profiler.stopProfiling();
      profile
        .export()
        .pipe(fs.createWriteStream(`cpuprofile-${Date.now()}.cpuprofile`))
        .on("finish", () => profile.delete());
    }, 60000);
    res.status(200).json("pong");
  } catch (err) {
    next(err);
  }
};

export default { cupProfiler };

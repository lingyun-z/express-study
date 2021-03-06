import * as cors from "cors";
import * as express from "express";
import { createServer } from "http";
import { sessionMiddleware } from "./middleware/sessionMiddleware";
import router from "./router";
import websocketServerSetup from "./websocket";
import { errorMap } from "./types/errorMap";

const corsConfig = {
  credentials: true,
  origin: ["http://localhost:3000"],
};

const app = express();
const httpServer = createServer(app);
websocketServerSetup(httpServer);

app.use(express.json());
app.use(cors(corsConfig));
app.use(sessionMiddleware);
app.use(router.router);
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { code, message } = errorMap[err.message] ?? {
      code: 500,
      message: err.message,
    };

    res.status(code).json({ message });
  }
);

export default httpServer;

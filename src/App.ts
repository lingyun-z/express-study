import * as cors from "cors";
import * as express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { sessionMiddleware } from "./middleware/sessionMiddleware";
import { socketAuthorizeMiddleware, wrap } from "./middleware/socketMiddleware";
import router from "./router";
import socketService from "./service/socketService";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";

const corsConfig = {
  credentials: true,
  origin: "http://localhost:3000",
};

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: corsConfig,
  // transports: ["websocket"],
});

const pubClient = createClient({ url: "redis://localhost:6379" });
const subClient = pubClient.duplicate();
subClient.connect();
pubClient.connect();
io.adapter(createAdapter(pubClient, subClient));

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
    res.status(500).json(err);
  }
);

io.use(wrap(sessionMiddleware));
io.use(socketAuthorizeMiddleware);

io.on("connect", (socket) => {
  console.log("user connect to server:", socket.data.user?.userName);
  socketService.connectHandler(socket);

  socket.onAny((event, ...args) => {
    console.log(`${socket.id}:`, event, args);
  });

  socket.on("chat_message", async (messgae) => {
    const parsedMessage = {
      ...messgae,
      from: socket.request.session.user?.userName,
    };
    socket.to(parsedMessage.to).emit("chat_message", parsedMessage);
  });

  socket.on("disconnecting", () => {
    socketService.disconnectHandler(socket);
  });
});

export default httpServer;

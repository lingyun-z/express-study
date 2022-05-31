import { createAdapter } from "@socket.io/redis-adapter";
import http from "http";
import { createClient } from "redis";
import { Server } from "socket.io";
import {
  chatMessageHandler,
  connectHandler,
  disconnectHandler,
} from "./handler";
import { authorizeMiddleware, sessionMiddleware } from "./middleware";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./types";

const corsConfig = {
  credentials: true,
  origin: "http://localhost:3000",
};

const websocketServerSetup = (httpServer: http.Server) => {
  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(httpServer, {
    cors: corsConfig,
    transports: ["websocket"],
  });

  const pubClient = createClient({ url: "redis://localhost:6379" });
  const subClient = pubClient.duplicate();
  subClient.connect();
  pubClient.connect();
  io.adapter(createAdapter(pubClient, subClient));

  io.use(sessionMiddleware);
  io.use(authorizeMiddleware);

  io.on("connect", (socket) => {
    socket.onAny((event, ...args) => {
      console.log(`${socket.id}:`, event, args);
    });
    connectHandler(socket);

    socket.on("chatMessage", (payload) => {
      chatMessageHandler(socket, payload);
    });

    socket.on("disconnecting", () => {
      disconnectHandler(socket);
    });
  });
};

export default websocketServerSetup;

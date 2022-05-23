import * as session from "express-session";
import * as connectRedis from "connect-redis";
import { createClient } from "redis";

const RedisStore = connectRedis(session);
let redisClient = createClient({
  socket: { port: 6379, host: "localhost" },
  legacyMode: true,
});
redisClient.connect().catch(console.error);

const sessionStore = new RedisStore({
  client: redisClient,
});

export default sessionStore;

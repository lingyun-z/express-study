import { createClient } from "redis";

const redisClient = createClient({
  socket: { port: 6379, host: "localhost" },
});
redisClient.connect().catch(console.error);

export default redisClient;

import { createClient } from "redis";

const redisClient = createClient({
  socket: { port: 6379, host: "localhost" },
});
redisClient
  .connect()
  .then(() => console.log("Connect to redis server."))
  .catch(console.error);

export default redisClient;

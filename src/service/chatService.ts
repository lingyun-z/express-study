import redisClient from "../lib/redisUtils";

const getOnlineUsers = async () => {
  const keyIterator = redisClient.scanIterator({ MATCH: "socket:userid:*" });
  const usersPromise = [];
  for await (const key of keyIterator) {
    usersPromise.push(
      (async () => {
        const [id, name] = await redisClient.hmGet(key, [
          "user:id",
          "user:name",
        ]);
        return { id, name };
      })()
    );
  }

  return Promise.all(usersPromise);
};

export default {
  getOnlineUsers,
};

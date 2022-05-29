import redisClient from "../lib/redisUtils";

const getSocketUserKey = (userId: string) => {
  return `socket:user:${userId}`;
};

export const saveSocketUser = async (
  userId: string,
  value: { socketId: string; username: string }
) => {
  const key = getSocketUserKey(userId);
  const { socketId, username } = value;

  return redisClient.hSet(key, [
    "socket:id",
    socketId,
    "user:id",
    userId,
    "user:name",
    username,
  ]);
};

export const deleteSocketUser = (userId: string) => {
  const key = getSocketUserKey(userId);

  return redisClient.del(key);
};

export const getOnlineUsers = async () => {
  const keyIterator = redisClient.scanIterator({
    MATCH: getSocketUserKey("*"),
  });
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

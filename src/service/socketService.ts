import redisClient from "../lib/redisUtils";

const getSocketKey = (userid: string) => {
  return `socket:userid:${userid}`;
};

const connectHandler = (socket) => {
  const userid = socket.request.session.user?.userName;
  if (userid) {
    const username = userid;
    socket.join(userid);
    setSocketId(userid, {
      socketid: socket.id,
      username: username,
    });
  }
};

const getSocketIdByUserid = (userid: string) => {
  const key = getSocketKey(userid);

  return redisClient.hGet(key, "socket:id");
};

const setSocketId = (
  userid: string,
  value: { socketid: string; username: string }
) => {
  const key = getSocketKey(userid);
  const { socketid, username } = value;

  return redisClient.hSet(key, [
    "socket:id",
    socketid,
    "user:id",
    userid,
    "user:name",
    username,
  ]);
};

const disconnectHandler = (socket) => {
  const key = getSocketKey(socket.request.session.user?.userName);

  return redisClient.del(key);
};

const chatMessageHandler = (socket) => {};

export default {
  connectHandler,
  getSocketIdByUserid,
  setSocketId,
  disconnectHandler,
  chatMessageHandler,
};

import httpServer from "./App";

const port = process.env.port ?? 8080;

httpServer.listen(port, () => {
  console.log(`server start on: http://localhost:${port}`);
});

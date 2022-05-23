const axios = require("axios");
const dealy = () => {
  return new Promise((resolve) => {
    setTimeout(resolve.bind(null, null), Math.floor(Math.random() * 5));
  });
};

const getUrl = () => {
  const urls = ["http://localhost:8080", "http://localhost:8081"];
  return urls[Math.floor(Math.random() * 2) % 2];
};

const request = async (id, key) => {
  await dealy();

  return axios({
    url: `${getUrl()}/redis/add/${key}/${id}`,
  });
};

const main = async (key) => {
  let success = 0;
  let fail = 0;
  let unconnect = 0;

  const promises = [];
  for (let i = 0; i < 1000; i++) {
    promises.push(
      request(i, key)
        .then(() => {
          success++;
        })
        .catch((err) => {
          if (err.response) {
            fail++;
          } else {
            unconnect++;
          }
        })
    );
  }
  await Promise.all(promises);
  console.log("success:", success);
  console.log("fail:", fail);
  console.log("unconnect:", unconnect);
  if (success !== 10) {
    throw new Error("error");
  }
};

(async () => {
  let batch = 0;
  while (batch < 20) {
    const key = `auto-test-${batch++}`;
    console.log(key);
    await main(key);
  }
})();

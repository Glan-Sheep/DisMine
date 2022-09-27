import DisMine from "./structures/_DisMine.js";

(async () => {
  const checkConfig = await require('./scripts/check-config').run();

  if (!checkConfig) {
    const client = new DisMine();
    client.init();
  }
})();

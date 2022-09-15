import Amane from "./structures/_Amane.js";

(async () => {
  const checkConfig = await require('./scripts/check-config').run();

  if (!checkConfig) {
    const client = new Amane();
    client.init();
  }
})();

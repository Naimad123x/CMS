require('dotenv').config();

(async () => {
  require("./src/utils/conn");
  await delay(5000);
  const Engine = require("./src/web/Engine");
  const engine = new Engine();

  engine.loadBlocks().then(async ()=> {

    require("./src/web/app");
  })
  module.exports = {engine}
})();


async function delay(ms) {
  // return await for better async stack trace support in case of errors.
  return await new Promise(resolve => setTimeout(resolve, ms));
}
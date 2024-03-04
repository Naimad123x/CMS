const express = require('express');
const {join} = require("path");
const bodyParser = require('body-parser');
const app = express();
const limiter = require("../utils/limiter");
const port = process.env.PORT;
const router = require("./routers/main/main")
const Engine = require("./Engine")
const engine = new Engine();

engine.loadBlocks();

app
  .disable('x-powered-by')
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .set(`view engine`, `ejs`)
  .set('views', join(__dirname, '/views'))
  .use(express.static(join(__dirname, '/public')))
  .use(limiter)

  .use("/", router)
  // .use("/login", login)


  .listen(port, () => {
    console.log(`server listening on port ${port}`);
  });
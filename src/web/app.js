const express = require('express');
// const morgan = require("morgan");
const logger = require("../utils/logger");
const {join} = require("path");
const bodyParser = require('body-parser');
const app = express();
const limiter = require("../utils/limiter");
const port = process.env.PORT;
const router = require("./routers/main/main")
const admin = require("./routers/admin/admin")
// const {engine} = require("../../index");

app
  .disable('x-powered-by')
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .set(`view engine`, `ejs`)
  .set('views', join(__dirname, '/views'))
  .use(express.static(join(__dirname, '/public')))
  .use(limiter)
  // .use(morgan("tiny"))

  .use("/", router)
  .use("/admin", admin)


  .listen(port, () => {
    console.log(`server listening on port ${port}`);
  });

app.use((req, res, next) => {
  logger.info({
    method: req.method,
    url: req.url,
    statusCode: res.statusCode,
    responseTime: Date.now() - req.startTime,
  });
  next();
});

module.exports = {app};
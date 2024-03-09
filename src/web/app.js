const express = require('express');
const morgan = require("morgan");
const {join} = require("path");
const bodyParser = require('body-parser');
const app = express();
const limiter = require("../utils/limiter");
const port = process.env.PORT;
const router = require("./routers/main/main")
const admin = require("./routers/admin/admin")
// const {engine} = require("../../index");

app
  .use(morgan("dev"))
  .disable('x-powered-by')
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .set(`view engine`, `ejs`)
  .set('views', join(__dirname, '/views'))
  .use(express.static(join(__dirname, '/public')))
  .use(limiter)

  .use("/", router)
  .use("/admin", admin)


  .listen(port, () => {
    console.log(`server listening on port ${port}`);
  });

module.exports = {app};
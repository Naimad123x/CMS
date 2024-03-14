const express = require('express');
const morgan = require("morgan");
const {join} = require("path");
const bodyParser = require('body-parser');
const app = express();
const limiter = require("../utils/limiter");
const port = process.env.PORT;
const router = require("./routers/main/main")
const admin = require("./routers/admin/admin")
const cookieParser = require('cookie-parser');
const session = require('express-session');


require("../utils/conn");
const api = require("./routers/api/api");

app
  .use(morgan("dev"))
  .disable('x-powered-by')
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(cookieParser())
  .set(`view engine`, `ejs`)
  .set('views', join(__dirname, '/views'))
  .use(express.static(join(__dirname, '/public')))
  .use(limiter)
  .set('trust proxy', 1)
  .use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

  .use("/", router)
  .use("/admin", admin)
  .use("/api", api)


  .listen(port, () => {
    console.log(`server listening on port ${port}`);
  });

module.exports = {app};
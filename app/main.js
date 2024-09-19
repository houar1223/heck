"use strict";

const express = require('express');
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const home = require("./routes/home");

const logger = require("./config/logger");

const PORT = process.env.PORT;

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/public`))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/", home);

app.listen(PORT, () => {
  logger.info(`${PORT} 포트에서 서버가 가동되었습니다.`);
});

module.exports = app;
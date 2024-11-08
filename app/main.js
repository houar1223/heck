"use strict";

const express = require('express');
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require("./config/logger");

const app = express();
dotenv.config();

const home = require("./routes/home");

const PORT = process.env.PORT;

app.set("views", "./views");
app.set("view engine", "ejs");

// 정적 파일 제공, 요청 본문 파싱, 쿠키 처리 미들웨어 설정
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// 세션 설정
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_secret', // 안전한 비밀 키 사용
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false, // 프로덕션에서는 HTTPS를 사용 시 true로 설정
      maxAge: 24 * 60 * 60 * 1000 // 1일
    }
  })
);

// 라우터 등록
app.use("/", home);

app.listen(PORT, () => {
    logger.info(`${PORT} 포트에서 서버가 가동되었습니다.`);
});

module.exports = app;

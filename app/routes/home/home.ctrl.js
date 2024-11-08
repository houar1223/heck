"use strict";

const User = require("../../models/User");
const UserStorage = require("../../models/UserStorage");
const logger = require("../../config/logger");

const output = {
  home: (req, res) => {
    logger.info(`GET / 304 "홈 화면으로 이동"`);
    res.render("home/index");
  }, 
  login: (req, res) => {
    logger.info(`GET /login 304 "로그인 화면으로 이동"`);
    res.render("home/login");
  },
  register: (req, res) => {
    logger.info(`GET /register 304 "회원가입 화면으로 이동"`);
    res.render("home/register")
  },
  map: (req, res) => {
    logger.info(`GET /map 304 "갤러리 화면으로 이동"`);
    res.render("home/map")
  }
}

const process = {
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login(req, res);

    if (response.success) {
      // 세션 설정
      req.session.user = {
        id: req.body.id,
      };
      logger.info(`POST /login 200 "로그인 성공: ${req.body.id}"`);
      return res.status(200).send(response);
    } else {
      logger.warn(`POST /login 401 "로그인 실패: ${response.msg}"`);
      return res.status(401).send(response);
    }

    const url = {
      method: "POST",
      path: "/login",
      status: response.err ? 400 : 200,
    };

    log(response, url);
    return res.status(url.status).json(response);
  },
  register: async (req, res) => {
    const user = new User(req.body);
    const response = await user.register();

    const url = {
      method: "POST",
      path: "/register",
      status: response.err ? 409 : 201,
    };

    logger.info(response, url);
    return res.status(url.status).json(response);
  },
  map: async (req, res) => {
    const url = {
      method: "POST",
      path: "/map",
      status: response.err ? 409 : 201,
    };

    logger.info(response, url);
    return res.status(url.status).json(response);
  }
};

module.exports = {
  output,
  process,
};

const log = (response, url) => {
  if (response.err)
    logger.error(`${url.method} ${url.path} ${url.status} Response: ${response.success}, ${response.err}`);
  else
    logger.info(`${url.method} ${url.path} ${url.status} Response: ${response.success}, ${response.msg || ""}`);
}
"use strict";

const UserStorage = require("./UserStorage");

class User {
  constructor(body) {
    this.body = body;
  }

  async login(req, res) {
    const client = this.body;
    try {
      const user = await UserStorage.getUsersInfo(client.id);
      if (user) {
        if (user.id === client.id && user.password === client.password) {
          req.session.user = {
            id: user.id,
            name: user.name,
          };
          return {success: true};
        }
        return {success: false, msg: "비밀번호가 틀렸습니다."};
      }
      return {success: false, msg: "존재하지 않는 아이디입니다."}
    } catch (err) {
      return { success: false, err };
    }
  }

  async register () {
    const client = this.body;
    try {
      const response = await UserStorage.save(client);
      return response;
    } catch (err) {
      return { success: false, err };
    }
  }
}

module.exports = User;

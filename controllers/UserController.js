// import Model User
const User = require("../models/User");

// buat class UserController
class UserController {
  // menambahkan keyword async

  async Registrasi(req, res) {
    try {
      const result = await User.create(req.body);
      const data = {
        message: "Register User Baru",
        data: result,
      };

      res.json(data);
    } catch (error) {
      res.json(error);
    }
  }

}

// membuat object UserController
const object = new UserController();

// export object UserController
module.exports = object;

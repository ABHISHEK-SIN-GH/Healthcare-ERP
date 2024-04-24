const { userModel } = require("../models/userModel");
const authService = require("./authService");

const superAdmin = {
  username: "admin",
  password: "admin",
  role: "admin"
};

const authController = async (req, res) => {
  const { username, password } = req.body;
  // const user = await userModel.find({username})
  // console.log(user);
  if (username == "admin" && password == "admin") {
    const data = superAdmin;
    const token = authService.generateToken(data);
    res.json({ token });
  } else {
    res.json({ error: "unauthorized username and password" });
  }
};

module.exports = { authController };

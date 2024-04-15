const authService = require("./authService");

const user = {
  id: 1,
  username: "admin",
  password: "admin",
  role: "doctor",
  email: "admin@mail.com",
  firstName: "super",
  lastName: "admin",
  age: 24
};

const authController = (req, res) => {
  const { username, password } = req.body;
  if (username == "admin" && password == "admin") {
    const data = user;
    const token = authService.generateToken(data);
    res.json({ token });
  } else {
    res.json({ error: "unauthorized username and password" });
  }
};

module.exports = { authController };

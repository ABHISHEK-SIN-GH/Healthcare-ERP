const { userModel } = require("../models/userModel");
const authService = require("./authService");

const superAdmin = {
  username:"admin",
  fname:"super",
  lname:"admin",
  phone:"9876543210",
  email:"admin@gmail.com",
  role:"admin",
  password:"admin",
  status:"active",
};

const authController = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.find({username})
    if (username == superAdmin.username && password == superAdmin.password) {
      const data = superAdmin;
      const token = authService.generateToken(data);
      res.json({ token, data:JSON.stringify(data)});
    } else{
      if(user[0].password==password){
        const data = user[0];
        const token = authService.generateToken(data);
        res.json({ token, data:JSON.stringify(data) });
      }else{
        res.json({ error: "wrong password..." });
      }
    }
  } catch (error) {
    res.json({ error: "unauthorized username and password" });
  } 
};

module.exports = { authController };

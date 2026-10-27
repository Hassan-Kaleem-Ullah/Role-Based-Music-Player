const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken');
const bcryptjs = require("bcryptjs");

async function registerUser(req, res) {
  const { username, email, password, role = "user" } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      msg: "Username, email and password are required",
    });
  }

  try {
    const isUserExists = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserExists) {
      return res.status(409).json({
        msg: "User already exists",
      });
    }

    const hashPass = await bcryptjs.hash(password, 10);

    const users = await userModel.create({
      username,
      email,
      password: hashPass,
      role,
    });

    res.status(201).json({
      msg: "Registeration successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
}

async function loginUser(req, res) {

  const { username, password } = req.body;

  try {

    const user = await userModel.findOne({
      username,

    });

    if (!user) {

      return res.status(401).json({
        msg: "Unauthorized User",

      });
    }

    const comparePass = await bcryptjs.compare(password, user.password);

    if (!comparePass) {

      return res.status(401).json({
        msg: "Unauthorized User",

      });
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET)

    res.cookie('token', token);

    res.status(200).json({

      msg: "Login successful",

    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      msg: "Internal server error",

    });
  }
}

async function logoutUser(req, res) {

  res.clearCookie('token');
  res.status(200).json({
    msg: "Logout successful",
    
  })
}

module.exports = { registerUser, loginUser, logoutUser};

const Admin = require("../models/adminuser");
const bcrypt = require("bcryptjs");
// const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const authconfig = require("../config/auth.config.js");


exports.signup = async (req, res) => {
  try {
    const oldAdmin = await Admin.findOne({ where: { username: req.body.username } });
    console.log("username",req.body.username);
    if (oldAdmin) {
      return res.status(409).json({
        code: 409,
        message: "User Already Registered!",
        data: oldAdmin,
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const adminUser = await Admin.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    return res.status(201).json({
      status: true,
      code: 201,
      message: "User was registered successfully!",
      data: adminUser,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: false,
      code: 500,
      message: "Internal Server Error",
      error: err,
    });
  }
};



  
  exports.login = async(req, res, next) => {
console.log("req",req.body);
const user= await Admin.findOne({
      where:{ email: req.body.email} 
  })

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      var token = jwt.sign({ id: user.dataValues.id }, authconfig.secret, {
        expiresIn: 86400 * 365,
      });
      res.status(200).send({
        id: user.id,
        contract_slug: user.contract_slug,
        accessToken: token,
        user: user,
      
      });
    // });
};


exports.all = (req, res, next) => {
  Admin.findAll().then((docs) => {
      const response = {
        status: true,
        code: 200,
        count: docs.length,
        message: "All User",
        users: docs
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find().populate("author", "username email");
  res.json(posts);
};

exports.deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ msg: "Post deleted by admin" });
};

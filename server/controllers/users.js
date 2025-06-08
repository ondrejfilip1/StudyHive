const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

exports.addUser = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    if (password.length < 8 || password.length > 64)
      return res
        .status(500)
        .send({ message: "Password must be 8-64 characters long" });

    const hash = await bcrypt.hash(password, 12);

    const findUser = await User.findOne({ username });
    if (findUser)
      return res.status(500).send({ message: "User already exists" });

    const data = new User({
      username: username,
      email: email,
      password: hash,
      dev: false,
    });

    const result = await data.save();
    if (result) {
      const token = jwt.sign(
        { id: result._id, isAdmin: result.isAdmin },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );

      return res.status(200).send({
        message: "User created",
        payload: result,
        token,
      });
    }
    res.status(500).send({
      message: "User not found",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await User.findOne({ email });
    if (!data || !(await bcrypt.compare(password, data.password))) {
      return res.status(500).send({
        message: "Invalid credentials",
        payload: data,
      });
    }

    const token = jwt.sign(
      { id: data._id, dev: data.dev },
      process.env.JWT_SECRET,
      {
        expiresIn: "90d",
      }
    );

    return res.status(200).send({
      token,
      user: { id: data._id, username: data.username, email: data.email, dev: data.dev },
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};
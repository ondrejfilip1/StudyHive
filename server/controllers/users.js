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

exports.getFriends = async (req, res, next) => {
  try {
    try {
      const { username } = req.body;

      const findUser = await User.findOne({ username });
      if (!findUser) return res.status(500).send({ message: "User not found" });
      const data = findUser.friends;

      if (data && data.length !== 0) {
        return res.status(200).send({
          message: "Friends found",
          payload: data,
        });
      }
      res.status(404).send({
        message: "Friends not found",
      });
    } catch (err) {
      res.status(500).send(err);
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.getUserProfile = async (req, res, next) => {
  try {
    const data = await User.findById(req.params.id);
    if (data) {
      const profileObject = {
        _id: data._id,
        username: data.username,
        pfpUrl: data.pfpUrl,
        email: data.email,
      };
      return res.status(200).send({
        message: "User found",
        payload: profileObject,
      });
    }
    res.status(404).send({
      message: "User not found",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.addFriend = async (req, res, next) => {
  try {
    const { username, friendUsername } = req.body;
    const findUser = await User.findOne({ username });
    const findFriend = await User.findOne({ username: friendUsername });
    if (!findUser || !findFriend)
      return res.status(500).send({ message: "User or friend does not exist" });

    if (findUser.friends.includes(findFriend._id))
      return res.status(500).send({
        message: "This user is already your friend",
      });

    const data = {
      friends: [...findUser.friends, findFriend._id],
    };
    const result = await User.findByIdAndUpdate(findUser._id, data);
    console.log(result);
    if (result) {
      return res.status(200).send({
        message: "User friend added",
        payload: result,
      });
    }
    return res.status(500).send({
      message: "User friend not added",
    });
  } catch (err) {
    //console.log(err);
    return res.status(500).send(err);
  }
};

exports.removeFriend = async (req, res, next) => {
  try {
    const { username, friendUsername } = req.body;
    const findUser = await User.findOne({ username });
    const findFriend = await User.findOne({ username: friendUsername });
    if (!findUser || !findFriend)
      return res.status(500).send({ message: "User or friend does not exist" });

    if (!findUser.friends.includes(findFriend._id))
      return res.status(500).send({
        message: "This user is not your friend",
      });

    // TODO
  } catch (err) {
    return res.status(500).send(err);
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
      user: {
        id: data._id,
        username: data.username,
        email: data.email,
        dev: data.dev,
      },
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

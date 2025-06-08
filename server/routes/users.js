const express = require("express");
const router = express.Router();
const userRouter = require("../controllers/users");

router.post("/login", userRouter.login);

router.post("/add-user", userRouter.addUser);

module.exports = router;

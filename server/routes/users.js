const express = require("express");
const router = express.Router();
const userRouter = require("../controllers/users");
const authUser = require("../middlewares/authUser");

router.post("/login", userRouter.login);

router.post("/add-user", userRouter.addUser);

router.put("/add-friend", authUser, userRouter.addFriend);

router.delete("/remove-friend", authUser, userRouter.removeFriend);

router.post("/get-friends", authUser, userRouter.getFriends);

router.get("/get-user-profile/:id", authUser, userRouter.getUserProfile);

module.exports = router;

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");

mongoose
  .connect(process.env.DB_KEY)
  .then(() => console.log("Connected to database"))
  .catch(() => console.log("Error: Cant connect to database"));

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.set("io", io);

const activeUsers = new Map();
const User = require("./models/users");

io.on("connection", (socket) => {
  console.log(`New connection from ${socket.handshake.address}`);

  socket.on("add-user", (data) => {
    socket.data.user = data;
    activeUsers.set(socket.data.user, socket.id);
    console.log("Active users:", [...activeUsers.values()]);
    io.emit("add-user", [...activeUsers.keys()]);
  });

  // public chat room (everyone can join)
  socket.on("chat", (data) => {
    const userMessage = {
      user: socket.data.user,
      message: data,
      time: Date.now(),
    };
    io.emit("chat", userMessage);
  });

  socket.on("dm", async ({ receiverId, message }) => {
    const receiverSocketId = activeUsers.get(receiverId);
    const senderUsername = socket.data.user;
    try {
      const sender = await User.findOne({ username: senderUsername });
      const receiver = await User.findOne({ username: receiverId });

      // friend check when dming
      if (
        sender &&
        receiver &&
        sender.friends.find((id) => id.equals(receiver._id))
      ) {
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("dm", {
            user: senderUsername,
            message,
            time: Date.now(),
          });

          // update sender
          socket.emit("dm", {
            user: senderUsername,
            message,
            time: Date.now(),
          });
        } else {
          socket.emit("dm", {
            user: "Error",
            message: "User is not connected",
          });
          //console.log(`User ${receiverId} isnt connected`);
        }
      } else {
        socket.emit("dm", {
          user: "Error",
          message: "This user is not your friend",
        });
      }
    } catch (err) {
      socket.emit("dm", {
        user: "Error",
        message: "Error occured",
      });
    }
  });
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const SOCKET_IO_PORT = process.env.SOCKET_IO_PORT;
server.listen(SOCKET_IO_PORT, () => {
  console.log(`Server is running on port ${SOCKET_IO_PORT}`);
});

module.exports = app;

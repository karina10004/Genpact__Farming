const express = require("express");
const connectDB = require("./db/connect");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
const chatRoute = require("./routes/chatRoute");
const messageRoute = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddle");
const app = express();
dotenv.config();
app.use(cors());
connectDB();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("api running");
});
app.use("/api/user", userRoute);
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoute);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const io = require("socket.io")(server, {
  pingTimedout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined" + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;
    if (!chat.users) return console.log("chat.users does not exist");
    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.senderr._id) return;
      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });
  socket.off("setup", () => {
    console.log("user disconnected");
    socket.leave(userData._id);
  });
});

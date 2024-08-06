const express = require("express");
const connectDB = require("./db/connect");
const cors = require("cors");
const http = require("http");
const dotenv = require("dotenv");
const path = require("path");
const { exec } = require("child_process");
const userRoute = require("./routes/userRoute");
const chatRoute = require("./routes/chatRoute");
const messageRoute = require("./routes/messageRoutes");
const expertRoute = require("./routes/expert");
const expertcallRoute = require("./routes/expertcall");
const socketIO = require("socket.io");
const blogRoute = require("./routes/blogPosts");
// const { notFound, errorHandler } = require("./middleware/errorMiddle");
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
app.use("/api/expert", expertRoute);
app.use("/api/call", expertcallRoute);
app.use("/api/blog", blogRoute);
// app.use(notFound);
// app.use(errorHandler);
app.use(express.static(path.join(__dirname, "build")));
app.post("/api/predict", (req, res) => {
  const { state, district, season } = req.body;

  if (!state || !district || !season) {
    return res
      .status(400)
      .json({ error: "State, district, and season are required" });
  }

  try {
    const jsonState = JSON.stringify(state);
    const jsonDistrict = JSON.stringify(district);
    const jsonSeason = JSON.stringify(season);
    console.log(jsonDistrict, jsonSeason, jsonState);
    const scriptPath = path.join(
      __dirname,
      "ML/crop_prediction/ZDecision_Tree_Model_Call.py"
    );
    const command = `python ${scriptPath} ${jsonState} ${jsonDistrict} ${jsonSeason}`;
    console.log("pandu pada");
    console.log(command);
    exec(command, (error, stdout, stderr) => {
      console.log("mcbcbbb");
      if (error) {
        console.error("Error executing Python script:", error);
        console.log("mcbec");
        return res.status(500).json({ error: "Error performing prediction" });
      }

      if (stderr) {
        console.error("Python script stderr:", stderr);
        console.log("mcbc");
        return res.status(500).json({ error: "Error performing prediction" });
      }
      console.log("hello");
      return res.json({ result: stdout });
    });
  } catch (error) {
    console.error("Error performing prediction:", error);
    res.status(500).json({ error: "Error performing prediction" });
  }
});

// Prediction route for fertilizers
app.post("/api/fertilizer-recommendation", (req, res) => {
  const { n, p, k, t, h, soilMoisture, soil, crop } = req.body;

  console.log("ama");
  if (!n || !p || !k || !t || !h || !soilMoisture || !soil || !crop) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const scriptPath = path.join(
      __dirname,
      "ML/fertilizer_recommendation/fertilizer_recommendation.py"
    );
    const command = `python ${scriptPath} ${n} ${p} ${k} ${t} ${h} ${soilMoisture} ${soil} ${crop}`;
    console.log("Executing command:", command);

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("Error executing Python script:", error);
        return res.status(500).json({ error: "Error performing prediction" });
      }

      if (stderr) {
        console.error("Python script stderr:", stderr);
        return res.status(500).json({ error: "Error performing prediction" });
      }

      console.log("Python script output:", stdout);
      return res.json({ result: stdout.trim() }); // .trim() to remove any extra new lines
    });
  } catch (error) {
    console.error("Error performing prediction:", error);
    res.status(500).json({ error: "Error performing prediction" });
  }
});
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io", socket.id);
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log(room);
    console.log("user joined" + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;
    console.log(chat);
    if (!chat.users) return console.log("chat.users does not exist");
    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) return;

      socket.in(chat._id).emit("message received", newMessageReceived);
    });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("call ended");
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    console.log(from, name);
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  socket.on("answercall", (data) => {
    io.to(data.to).emit("callaccepted", data.signal);
  });

  socket.emit("me", socket.id);

  socket.on("join:room", ({ roomId }) => {
    socket.join(roomId);
    io.to(roomId).emit("user:joined", socket.id);
  });

  socket.off("setup", () => {
    console.log("user disconnected");
    socket.leave(userData._id);
  });
});

const express = require("express");
const connectDB = require("./db/connect");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
const { notFound, errorHandler } = require("./middleware/errorMiddle");
const app = express();
dotenv.config();

connectDB();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("api running");
});
app.use("/api/user", userRoute);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

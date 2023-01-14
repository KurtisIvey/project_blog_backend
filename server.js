require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

//must have port setup this way because heroku uses the env PORT on deployment
const port = process.env.PORT || 3001;

// routes
const adminRouter = require("./routes/admin.route");
const postRouter = require("./routes/post.route");
const userRouter = require("./routes/user.route");

// middlewares
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// mongodb
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const mongoDB = process.env.DB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.redirect("/api");
});
app.use("/api/admin", adminRouter);
app.use("/api/posts", postRouter);
app.use("/api/", userRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

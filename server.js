require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

//must have port setup this way because heroku uses the env PORT on deployment
const port = process.env.PORT || 3001;

// routes
const adminRouter = require("./routes/admin.route");

// middlewares
app.use(cors());
app.use(express.json());
//app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// temp ejs implementation to register admin
//app.set("views", path.join(__dirname, "views"));
//app.set("view engine", "ejs");

// mongodb
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const mongoDB = process.env.DB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/admin", adminRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

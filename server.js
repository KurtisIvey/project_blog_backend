require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// mongodb
const mongoDB = process.env.DB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config();

const posts = require("./routes/api/posts");

const app = express();

// Body Parser Middleware
app.use(bodyParser.json());

// Connect to Mongo
console.log("MONGO URI: ", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => console.error(err));

// Use Routes
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

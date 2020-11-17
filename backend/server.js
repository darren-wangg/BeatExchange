const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const posts = require("./routes/api/Posts");

const app = express();

// Body Parser Middleware
app.use(bodyParser.json());

// DB COnfig
const db = require("./config/keys").mongoURI;

// Connect to Mongo
mongoose
  .connect(db)
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch(err => console.error(err));

// Use Routes
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

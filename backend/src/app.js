// import some node modules for later
const express = require("express");
const fs = require("node:fs");
const path = require("node:path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./router");

// create express app
const app = express();

// use some application-level middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// import and mount the API routes
app.use(router);

// serve the `backend/public` folder for public resources

app.use(express.static(path.join(__dirname, "../public")));

// serve REACT APP

const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
);

if (fs.existsSync(reactIndexFile)) {
  // serve REACT resources

  app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

  // redirect all requests to the REACT index file

  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}

// ready to export

module.exports = app;

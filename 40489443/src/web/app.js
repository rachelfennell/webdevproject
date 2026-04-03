// Imports
const express = require("express");
const path = require("path");
const session = require("express-session");
const db = require("./config/db.js");

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// App setup
const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Session setup (for login later)
app.use(
  session({
    secret: "hedclass-secret",
    resave: false,
    saveUninitialized: false,
  })
);


























// Start server
app.listen(PORT, (err) => {
  console.log(`listening on port http://localhost:${PORT}`);
});
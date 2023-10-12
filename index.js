"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
    $ npm i jsonwebtoken
*/

const express = require("express");
const app = express();

/* ------------------------------------------------------- */
//Required
require("dotenv").config();
const PORT = process.env?.PORT || 8000;

require("express-async-errors");
// continue from here...

//config

//connect to db
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();
/* ------------------------------------------------------- */

//middlewares

//accept json
app.use(express.json());

// SessionsCookies:
app.use(require("cookie-session")({ secret: process.env.SECRET_KEY }));

// res.getModelList():
app.use(require("./src/middlewares/findSearchSortPage"));

// Routes:

// HomePath:
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to PERSONNEL API",
    session: req.session,
    isLogin: req.isLogin,
  });
});
//departments
app.use("departments", require("./src/routes/department.router"))


// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()

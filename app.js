// import express dan router
const express = require("express");
const router = require("./routes/api.js");
const jwt = require("jsonwebtoken");

// import dotenv dan menjalankan method config
require("dotenv").config();

// destructing object process.env
const { APP_PORT, JWT_SECRET } = process.env;

// membuat object express
const app = express();

// menggunakan middleware
app.use(express.json());

// Middleware untuk verifikasi token
function verifyToken(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token tidak disediakan' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token tidak valid' });
    } else {
      req.user = decoded;
      next();
    }
  });
}
// menggunakan routing (router)
app.use(router);

// mendefinisikan port
app.listen(APP_PORT, () =>
  console.log(`Server running at: http://localhost:${APP_PORT}`)
);

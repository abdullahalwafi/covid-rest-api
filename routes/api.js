// import PatientController
const PatientController = require("../controllers/PatientController");
const UserController = require("../controllers/UserController");
const jwt = require("jsonwebtoken");

// import express
const express = require("express");

// membuat object router
const router = express.Router();

/**
 * Membuat routing
 */

function authenticateToken(req, res, next) {
  const token = req.header("Authorization");
  console.log("Received Token:", token);

  if (!token) {
    return res.status(401).json({ error: "Access denied. Token is missing." });
  }

  jwt.verify(token, "your-secret-key", (err, user) => {
    if (err) {
      console.log("Decoded User Information:", user);
      console.error("Token Verification Error:", err);
      return res.status(403).json({ error: "Invalid token." + user});
    }
    req.user = user;
    next();
  });
}

router.get("/", (req, res) => {
  res.send("Hello Covid API Express");
});

// middleware
router.use("/patients", authenticateToken);
// Membuat routing patient
router.get("/patients", PatientController.index);
router.post("/patients", PatientController.store);
router.put("/patients/:id", PatientController.update);
router.delete("/patients/:id", PatientController.destroy);
router.get("/patients/:id", PatientController.show);
router.get("/patients/search/:name", PatientController.search);
router.get("/patients/status/positive", PatientController.positive);
router.get("/patients/status/recovered", PatientController.recovered);
router.get("/patients/status/dead", PatientController.dead);
router.get("/patients/status/dead", PatientController.dead);

// register
router.post("/register", UserController.Registrasi);
// login
router.post("/login", UserController.Login);
// export router
module.exports = router;

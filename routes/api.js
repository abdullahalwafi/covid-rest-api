// import PatientController
const PatientController = require("../controllers/PatientController");
const AuthController = require("../controllers/UserController");

// import express
const express = require("express");
// import jwt token
const jwt = require("jsonwebtoken");

// membuat object router
const router = express.Router();

/**
 * Membuat routing
 */

router.get("/", (req, res) => {
  res.send("Hello Covid API Express");
});
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

// export router
module.exports = router;

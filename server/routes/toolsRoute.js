const express = require("express");
const router = express.Router();
const {calculateAssignment,calculateTransportation, calculateSimplex} = require("../controllers/calculators/OR");

router.post("/calc/or/assignment",calculateAssignment);
router.post("/calc/or/transportation",calculateTransportation);
router.post("/calc/or/simplex",calculateSimplex);

module.exports = router;
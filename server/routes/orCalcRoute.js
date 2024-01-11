const express = require("express");
const router = express.Router();
const {calculateAssignment,calculateTransportation, calculateSimplex} = require("../controllers/calculators/OR");

router.post("/assignment",calculateAssignment);
router.post("/transportation",calculateTransportation);
router.post("/simplex",calculateSimplex);

module.exports = router;
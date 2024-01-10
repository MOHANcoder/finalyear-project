const express = require("express");
const router = express.Router();
const {calculateAssignment,calculateTransportation} = require("../controllers/calculators/OR");

router.post("/calc/or/assignment",calculateAssignment);
router.post("/calc/or/transportation",calculateTransportation);

module.exports = router;
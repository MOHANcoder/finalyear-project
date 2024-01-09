const express = require("express");
const router = express.Router();
const {calculateAssignment} = require("../controllers/calculators/OR");

router.post("/calc/or-assignment",calculateAssignment);

module.exports = router;
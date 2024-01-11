const express = require("express");
const router = express.Router();
const orCalcRoute = require("./orCalcRoute");

router.post("/or",orCalcRoute);


module.exports = router;
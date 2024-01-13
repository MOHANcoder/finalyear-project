const express = require("express");
const router = express.Router();
const orCalcRoute = require("./orCalcRoute");

router.use("/or",orCalcRoute);


module.exports = router;
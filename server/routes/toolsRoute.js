const express = require("express");
const router = express.Router();
const ocrRouter = require("./ocrRoute");
const calcRouter = require("./calcRoute");

router.use("/ocr",ocrRouter);
router.use("/calc",calcRouter);
module.exports = router;
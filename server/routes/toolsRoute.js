const express = require("express");
const router = express.Router();
const ocrRouter = require("./ocrRoute");
const calcRouter = require("./calcRoute");
const { paraSummary } = require("../controllers/textsummary/summary");

router.use("/ocr",ocrRouter);
router.use("/calc",calcRouter);
router.post("/summary",paraSummary);
module.exports = router;
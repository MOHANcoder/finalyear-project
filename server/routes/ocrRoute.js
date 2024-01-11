const express = require("express");
const bodyparser = require("body-parser");
const router = express.Router();

const {scanImage,scanPdf} = require("../controllers/ocr/ocr")

router.use(bodyparser.urlencoded({ extended: true }));
router.post("/pdf",scanPdf);
router.post("/image",scanImage);

module.exports = router;
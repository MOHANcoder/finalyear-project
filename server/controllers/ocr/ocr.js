const path = require("path");
const multer = require("multer");
const fs = require("fs");
const { ocrPdf, ocrImage } = require("../../services/ocr");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..","..","uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});



module.exports = {
    scanPdf: async (req, res) => {
        const upload = multer({ storage }).single("pdf_input");
        upload(req, res, async (error) => {
            try {
                const file = req.file;
                const { language } = req.body;
                if (file && file.mimetype === 'application/pdf') {
                    const f = await fs.readFile(path.join(__dirname, "..","..","uploads", file.originalname));
                    const text = await ocrPdf(f, language);
                    return res.status(200).send(text);
                } else {
                    throw new Error("Not a pdf file");
                }
            } catch (error) {
                return res.status(400).send(error);
            }
        })
    },
    scanImage: async (req, res) => {
        const upload = multer({ storage }).single("image_input");
        upload(req, res, async (error) => {
            try {
                const file = req.file;
                const { language } = req.body;
                if (file && file.mimetype.startsWith("image/")) {
                    const f = await fs.readFile(path.join(__dirname,"..","..", "uploads", file.originalname));
                    const text = await ocrImage(f, language);
                    return res.status(200).send(text);
                } else {
                    throw new Error("not a image file");
                }
            } catch (error) {
                console.log(error);
            }
        })
    }
};

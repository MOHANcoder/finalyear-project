const { createWorker } = require("tesseract.js");
const {getDocument} = require("pdfjs-dist");
const { createCanvas } = require("canvas");

const ocrImage = async (filebuffer, language) => {
    const worker = await createWorker(language);
    const ret = await worker.recognize(filebuffer);
    await worker.terminate();
    return ret.data.text;
}

const ocrPdf = async (pdfFile, language) => {
    const pdf = await getDocument({ data: pdfFile }).promise;
    const images = [];
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = createCanvas(viewport.width, viewport.height);
        await page.render({
            canvasContext: canvas.getContext("2d"),
            viewport: viewport,
        }).promise;
        images.push(canvas.toDataURL("image/png"));
    }

    const worker = await createWorker(language);
    const pageContent = [];
    for (const image of images) {
        const {
            data: { text },
        } = await worker.recognize(image);
        pageContent.push(text);
    }
    await worker.terminate();
    return pageContent;
}

module.exports = {
    ocrImage,
    ocrPdf
};
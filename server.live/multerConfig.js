const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Absolute paths
const imageDir = path.join(__dirname, "uploads", "images");
const pdfDir = path.join(__dirname, "uploads", "pdfs");

// Ensure folders exist
if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir, { recursive: true });
if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, pdfDir);
        } else {
            cb(null, imageDir);
        }
    },
    filename: (req, file, cb) => {
        cb(
            null,
            Date.now() + "-" + file.fieldname + path.extname(file.originalname),
        );
    },
});

// File filter (only images + pdf)
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/pdf",
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only Images & PDFs are allowed"), false);
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter,
});

module.exports = upload;

const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dirPath = "./uploads";

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const UploadFile = multer({
  storage,

  limits: {
    fileSize: 6 * 1024 * 1024,
  },
});

module.exports = {
  UploadFile,
};

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const dirPath = path.resolve(__dirname, "../uploads");

//     if (!fs.existsSync(dirPath)) {
//       fs.mkdirSync(dirPath, { recursive: true });
//     }
//     cb(null, dirPath);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
//     const sanitizedFileName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");
//     cb(null, `${uniqueSuffix}-${sanitizedFileName}`);
//   },
// });

// // Create multer instance
// const uploadFile = multer({
//   storage: storage,
//   limits: {
//     fileSize: 6 * 1024 * 1024, // 6 MB
//   },
// });

// module.exports = {
//   uploadFile
// };

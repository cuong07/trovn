import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // set upload destination folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // set uploaded file name
  },
});

export const upload = multer({ storage: storage });

import multer from "multer";

let counter = 1;
const maxCount = 200;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    if (counter > maxCount) {
      counter = 1;
    }

    const fileName = `Image${counter++}${file.originalname.substring(file.originalname.lastIndexOf("."))}`;

    cb(null, fileName);
  },
});

export const upload = multer({ storage, limits: { fileSize: 10485760 } });

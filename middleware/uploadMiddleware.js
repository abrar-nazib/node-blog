const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/uploads"); // first argument for error passing, second for path
  }, // what is the destination folder
  filename: (req, file, callback) => {
    const uniqueName = `${file.fieldname}-${Date.now()}-${path.extname(
      file.originalname
    )}`;
    // fieldname is the name=name from form
    callback(null, uniqueName);
  }, // what will be the file name after uploaded
});

const upload = multer(
  // multer is a function that takes an object as argument and returns a middleware
  {
    storage: storage,
    limit: {
      filesize: 5 * 1024 * 1024, // 5 MB
    },
    fileFilter: (req, file, callback) => {
      const types = /jpeg|jpg|png|gif/;
      const extName = types.test(path.extname(file.originalname).toLowerCase()); // check the extension with regex
      const mimeType = types.test(file.mimetype); // check the mime type

      if (extName && mimeType) {
        callback(null, true);
      } else {
        callback(new Error("Only support images"));
      }
    },
  }
);

module.exports = upload;

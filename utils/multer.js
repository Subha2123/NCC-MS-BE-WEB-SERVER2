import multer from 'multer'
import path from 'path'


var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload");
  },

  filename: (req, file, cb) => {
   
    cb(
      null,
      file.originalname.replace(/\.[^/.]+$/, "") +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});


const upload = multer({ storage: storage });



export default upload


// Multer config
// const Multer = multer({
//   storage: multer.diskStorage({}),
//   fileFilter: (req, file, cb) => {
//     let ext = path.extname(file.originalname);
//     if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
//       cb(new Error("Unsupported file type!"), false);
//       return;
//     }
//     cb(null, true);
//   },
// });

// export default Multer
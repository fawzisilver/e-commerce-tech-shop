import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import multer from 'multer';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Update destination to 'frontend/public/images'
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname,'../../frontend/public/images'));
    // Save to 'frontend/public/images'
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Images only!'), false);
  }
}

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image');

router.post('/', (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    // Make sure to return the correct path for React to access
    res.status(200).send({
      message: 'Image uploaded successfully',
      image: `/images/${req.file.filename}`,  // Adjusted path
    });
  });
});

export default router;

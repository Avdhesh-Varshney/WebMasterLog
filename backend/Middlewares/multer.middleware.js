import multer from "multer";

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname + "-" + Date.now());
    }
});

const upload = multer({ storage: storage });

export default upload;

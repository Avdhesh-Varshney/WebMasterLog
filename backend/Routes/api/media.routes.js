import express from "express";
import upload from "../../Middlewares/multer.middleware.js";
import { getUploadUrl } from "../../Controllers/media.controller.js";

const mediaRoutes = express.Router();

mediaRoutes.post("/get-upload-url", upload.single('image'), getUploadUrl);

export default mediaRoutes;

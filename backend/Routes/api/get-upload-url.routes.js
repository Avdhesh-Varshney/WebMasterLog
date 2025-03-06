import express from "express";
import upload from "../../Middlewares/multer.middleware.js";
import { getUploadUrl } from "../../Controllers/get-upload-url.controller.js";

const mediaUploadRoute = express.Router();

mediaUploadRoute.post("/get-upload-url", upload.single('image'), getUploadUrl);

export default mediaUploadRoute;

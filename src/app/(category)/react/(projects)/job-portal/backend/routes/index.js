import express from "express";
import jobRoute from "./jobsRoutes.js";

const router = express.Router();

const path = "/api-v1/";

router.use(`${path}jobs`, jobRoute);

export default router;

import express from "express";
import { createProject, getProject } from "../../Controllers/project.controller.js";
import { authenticateUser } from "../../Middlewares/auth.middleware.js";

const projectRoutes = express.Router();

projectRoutes.post("/create", authenticateUser, createProject);
projectRoutes.get("/get", getProject);

export default projectRoutes;

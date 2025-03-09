import express from "express";
import { createProject, getProjects, searchProjects, trendingProjects } from "../../Controllers/project.controller.js";
import { authenticateUser } from "../../Middlewares/auth.middleware.js";

const projectRoutes = express.Router();

projectRoutes.post("/create", authenticateUser, createProject);
projectRoutes.get("/get", getProjects);
projectRoutes.get("/trending", trendingProjects);
projectRoutes.post("/search", searchProjects);

export default projectRoutes;

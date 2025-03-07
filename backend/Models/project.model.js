import mongoose from "mongoose";
import projectSchema from "../Schemas/project.schema.js";

const Project = mongoose.model("projects", projectSchema);

export default Project;

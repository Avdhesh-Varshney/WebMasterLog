import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema(
  {
    company: {
      type: [{ type: Schema.Types.ObjectId, ref: "Companies" }],
    },
    jobTitle: {
      type: String,
      required: [true, "Job Title is required"],
    },
    jobType: {
      type: String,
      required: [true, "Job Type is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    salary: {
      type: String,
      required: [true, "Salary is required"],
    },
    vacancies: {
      type: Number,
    },
    experiences: {
      type: Number,
      default: 0,
    },
    detail: [
      {
        desc: { type: Number },
        requirements: { type: Number },
      },
    ],
    application: {
      type: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    },
  },
  { timestamps: true }
);

const Jobs = mongoose.model("Jobs", jobSchema);

export default Jobs;

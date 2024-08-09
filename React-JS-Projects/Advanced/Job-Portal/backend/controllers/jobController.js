import mongoose from "mongoose";
import { check, validationResult } from "express-validator";
import Jobs from "../models/jobsModel.js";
import Companies from "../models/companiesModel.js";

// Input validation middleware (no sanitization)
const validateJobInput = [
  check("jobTitle").notEmpty().withMessage("Job title is required"),
  check("jobType").notEmpty().withMessage("Job type is required"),
  check("location").notEmpty().withMessage("Location is required"),
  check("salary").notEmpty().withMessage("Salary is required"),
  check("desc").notEmpty().withMessage("Description is required"),
  check("requirements").notEmpty().withMessage("Requirements are required"),
];

export const createJob = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Using hardcoded values for the example
    const jobPost = {
      jobTitle: "Software Engineer",
      jobType: "Full-Time",
      location: "San Francisco",
      salary: "$120,000",
      vacancies: 5,
      experience: "2+ years",
      detail: { desc: "Develop and maintain web applications", requirements: "Experience with React and Node.js" },
      company: "60c72b2f9b1d8e001c8e4a9e" 
    };

    const job = new Jobs(jobPost);
    await job.save();

    const company = await Companies.findById(jobPost.company);
    company.jobPosts.push(job._id);
    await company.save();

    res.status(200).json({
      success: true,
      message: "Job Posted Successfully",
      job,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getJobPosts = async (req, res, next) => {
  try {
    const queryObject = {
      location: { $regex: "San Francisco", $options: "i" },
      jobType: { $in: ["Full-Time", "Part-Time"] },
      experience: {
        $gte: 1,
        $lte: 3
      },
    };

    let queryResult = Jobs.find(queryObject).populate({
      path: "company",
      select: "-password",
    });

    const page = 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    const totalJobs = await Jobs.countDocuments(queryObject);
    const numOfPage = Math.ceil(totalJobs / limit);

    queryResult = queryResult.skip(skip).limit(limit);

    const jobs = await queryResult;

    res.status(200).json({
      success: true,
      totalJobs,
      data: jobs,
      page,
      numOfPage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const job = await Jobs.findById(id).populate({
      path: "company",
      select: "-password",
    });

    if (!job) {
      return res.status(404).json({
        message: "Job Post Not Found",
        success: false,
      });
    }

    const searchQuery = {
      $or: [
        { jobTitle: { $regex: "Software Engineer", $options: "i" } },
        { jobType: { $regex: "Full-Time", $options: "i" } },
      ],
    };

    const similarJobs = await Jobs.find(searchQuery)
      .populate({
        path: "company",
        select: "-password",
      })
      .sort({ _id: -1 })
      .limit(6);

    res.status(200).json({
      success: true,
      data: job,
      similarJobs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteJobPost = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Jobs.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Job Post Deleted Successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Export validateJobInput middleware
export { validateJobInput };


import Pres from "../models/presModel.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
// Create a new prescription
export const createPrescription = async (req, res) => {
    const key = req.user._id;
    try {
      const { doctorName, hospitalName, date, medicines, location,documentUpload } = req.body;
      const parsedLocation = JSON.parse(location);
      const parsedMedicines = JSON.parse(medicines);
      let uploadedFile;
        if(documentUpload){
            const uploadResponse = await cloudinary.uploader.upload(documentUpload);
            uploadedFile = uploadResponse.secure_url;
        }
      // Check if a file was uploaded
      
      console.log(uploadedFile)
      // Create the prescription document
      const newPrescription = new Pres({
        doctorName,
        hospitalName,
        date,
        medicines: parsedMedicines,
        location: parsedLocation,
        documentUpload: uploadedFile,
        key
      });
  
      // Save to database
      await newPrescription.save();
  
      res.status(201).json({ message: "Prescription created successfully.", newPrescription });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message || "Server error occurred." });
    }
  };

 
// Get all prescriptions
export const getAllPrescriptions = async (req, res) => {
    try {
        const reqid = req.user._id;
        const presList = await Pres.find().where('key').equals(reqid);
        res.status(200).json(presList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getPrescriptionById = async (req, res) => {
    try {
        const pres = await Pres.findById(req.params.id);
        if (!pres) {
            return res.status(404).json({ error: 'Prescription not found' });
        }
        res.status(200).json(pres);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a prescription by ID
export const updatePrescriptionById = async (req, res) => {
    try {
        const updatedPres = await Pres.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedPres) {
            return res.status(404).json({ error: 'Prescription not found' });
        }
        res.status(200).json(updatedPres);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a prescription by ID
export const deletePrescriptionById = async (req, res) => {
    try {
        const deletedPres = await Pres.findByIdAndDelete(req.params.id);
        if (!deletedPres) {
            return res.status(404).json({ error: 'Prescription not found' });
        }
        res.status(200).json({ message: 'Prescription deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


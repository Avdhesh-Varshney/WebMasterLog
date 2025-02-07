
import  express from "express";
import {createPrescription,getAllPrescriptions, updatePrescriptionById,deletePrescriptionById, getPrescriptionById} from "../controllers/pres.controllers.js";
const router = express.Router();
import { protectRoute } from "../middlewares/auth.middleware.js";
import multer from "multer"
const storage = multer.memoryStorage(); // Stores files in memory as Buffer
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});
router.post('/prescriptions',protectRoute,upload.single("documentUpload"), createPrescription);
router.get('/prescriptions',protectRoute, getAllPrescriptions);
router.put('/prescriptions/:id',protectRoute, updatePrescriptionById);
router.delete('/prescriptions/:id',protectRoute, deletePrescriptionById);
router.get('/prescriptions/:id',protectRoute, getPrescriptionById);

export default router;
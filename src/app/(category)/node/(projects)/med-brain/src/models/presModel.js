import mongoose from 'mongoose';

const PresSchema = new mongoose.Schema({
    doctorName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    medicines: [{
        name: {
            type: String,
            required: true
        },
        dosage: {
            type: String,
            required: true
        },
        timing: {
            type: String,
            required: true
        }
    }],
    documentUpload: [{
        type: String, // Store file path or URL
        required: false
    }],
    hospitalName: {
        type: String,
        required: true
    },
    location: {
        lat: {
            type: Number,
            required: true,
        },
        lng: {
            type: Number,
            required: true,
        },
    },
    key:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        
    }
});

const Pres = mongoose.model('Pres', PresSchema);
export default Pres;

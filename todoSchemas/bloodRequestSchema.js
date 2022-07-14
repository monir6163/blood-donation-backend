const mongoose = require("mongoose");
const BloodRequestSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required!"],
    },
    number: {
        type: String,
        required: [true, "Number is required!"],
    },
    hospitalName: {
        type: String,
        required: [true, "HospitalName is required!"],
    },
    address: {
        type: String,
        required: [true, "Address is required!"],
    },
    bloodGroup: {
        type: String,
        required: [true, "BloodGroup is required!"],
    },
    bloodDate: {
        type: String,
        required: [true, "BloodDate is required!"],
    },
    details: {
        type: String,
        required: [true, "Details is required!"],
    },
    donarCost: {
        type: String,
        required: [true, "DonarCost is required!"],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    requestDate: {
        type: Date,
        default: Date.now,
    },
});
module.exports = BloodRequestSchema;

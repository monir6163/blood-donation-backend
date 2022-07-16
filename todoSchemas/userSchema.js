const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required!"],
    },
    age: {
        type: String,
        required: [true, "Age is required!"],
    },
    bloodGroup: {
        type: String,
        required: [true, "Blood group is required!"],
    },
    donar: {
        type: String,
        required: [true, "Donar is required!"],
    },
    donarTimes: {
        type: String,
        required: [true, "DonarTimes is required!"],
    },
    image: {
        type: String,
        required: [true, "Image is required!"],
    },
    imageUrl: {
        type: String,
        required: [true, "Image Url Not Ready"],
    },
    number: {
        type: String,
        unique: true,
        required: [true, "Number is required!"],
    },

    password: {
        type: String,
        required: [true, "Password is required!"],
    },
    status: {
        type: String,
        default: "active",
    },
    date: {
        type: Date,
        default: Date.now,
    },
    divisionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "divisions",
    },
    districtId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "districts",
    },
    upazilaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "upazilas",
    },
    unionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "unions",
        required: false,
    },
    pc: {
        type: String,
    },
});
module.exports = userSchema;

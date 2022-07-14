const mongoose = require("mongoose");
const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: [true, "Description is required!"],
    },
    status: {
        type: String,
        enum: ["active", "Inactive"],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
module.exports = todoSchema;

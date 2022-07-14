const mongoose = require("mongoose");
const districtSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    division_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    bn_name: {
        type: String,
        required: true,
    },
    lat: {
        type: String,
        required: true,
    },
    lon: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
});
module.exports = districtSchema;

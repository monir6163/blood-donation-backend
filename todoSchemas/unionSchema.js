const mongoose = require("mongoose");
const unionSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    upazilla_id: {
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
    url: {
        type: String,
        required: true,
    },
});
module.exports = unionSchema;

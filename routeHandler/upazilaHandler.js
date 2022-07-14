const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const upazilaSchema = require("../todoSchemas/upazilaSchema");
const Upazila = new mongoose.model("upazilas", upazilaSchema);
router.get("/all", async (req, res) => {
    try {
        const upazilas = await Upazila.find();
        res.status(200).send(upazilas);
    } catch (err) {
        res.status(500).send({
            error: err,
        });
    }
});

module.exports = router;

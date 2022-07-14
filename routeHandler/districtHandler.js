const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const districtSchema = require("../todoSchemas/districtSchema");
const District = new mongoose.model("districts", districtSchema);
router.get("/all", async (req, res) => {
    try {
        const districts = await District.find();
        res.status(200).send(districts);
    } catch (err) {
        res.status(500).send({
            error: err,
        });
    }
});

module.exports = router;

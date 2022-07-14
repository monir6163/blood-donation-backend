const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const unionSchema = require("../todoSchemas/unionSchema");
const unionModel = new mongoose.model("unions", unionSchema);
router.get("/all", async (req, res) => {
    try {
        const union = await unionModel.find({});
        res.status(200).send(union);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;

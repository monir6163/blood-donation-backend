const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const divisionSchema = require("../todoSchemas/divisionSchema");
const Division = new mongoose.model("divisions", divisionSchema);
router.get("/all", async (req, res) => {
    try {
        const divisions = await Division.find();
        res.status(200).send(divisions);
    } catch (err) {
        res.status(500).send({
            error: err,
        });
    }
});
module.exports = router;

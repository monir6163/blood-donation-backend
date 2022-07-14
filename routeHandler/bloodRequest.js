const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bloodRequestSchema = require("../todoSchemas/bloodRequestSchema");
const bloodRequest = new mongoose.model("bloodRequests", bloodRequestSchema);
//blood requests get all
router.get("/api/bloodRequests", async (req, res) => {
    try {
        const total_page = 8;
        const page = parseInt(req.query.page || "0");
        const total_user = await bloodRequest.countDocuments({});
        const bloodData = await bloodRequest
            .find({})
            .populate("userId", "imageUrl -_id", "User")
            .select({
                __v: 0,
            })
            .sort({ _id: -1 })
            .limit(total_page)
            .skip(total_page * page)
            .exec();
        if (bloodData) {
            res.status(200).send({
                status: "success",
                bloodData: bloodData,
                totalPages: Math.ceil(total_user / total_page),
            });
        } else {
            res.status(404).send({
                status: "404 Not Found",
                message: "Not Found",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: err,
        });
    }
});
//post a blood requests
router.post("/api/bloodRequests", async (req, res) => {
    try {
        const newBloodRequest = new bloodRequest({
            name: req.body.name,
            number: req.body.number,
            hospitalName: req.body.hospitalName,
            address: req.body.address,
            bloodGroup: req.body.bloodGroup,
            bloodDate: req.body.bloodDate,
            details: req.body.details,
            donarCost: req.body.donarCost,
            userId: req.body.userId,
        });
        const bloodSave = await newBloodRequest.save();
        if (bloodSave) {
            res.status(200).send({
                status: "success",
                message: "Your blood request has been saved successfully.",
            });
        } else {
            res.status(404).send({
                status: "error",
                message: "An error has occurred while saving the request.",
            });
        }
    } catch (err) {
        res.status(500).send({
            status: "error",
            message: err.message,
        });
    }
});
module.exports = router;

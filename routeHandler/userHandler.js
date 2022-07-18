const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const router = express.Router();
const userSchema = require("../todoSchemas/userSchema");
const User = new mongoose.model("User", userSchema);
const checkLogin = require("../middlewares/checkLogin");
// image upload with multer mongoose
const img_upload = "./uploads";
const imgstorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, img_upload);
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName =
            file.originalname
                .replace(fileExt, "")
                .toLocaleLowerCase()
                .split(" ")
                .join("-") +
            "-" +
            Date.now();
        cb(null, fileName + fileExt);
    },
});
// file validation
var uploads = multer({
    storage: imgstorage,
    limits: {
        fileSize: 3000000,
    },
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/jpeg" ||
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg"
        ) {
            cb(null, true);
        } else {
            cb("only image file allowed");
        }
    },
});

//register user
router.post("/register", uploads.single("image"), async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            age: req.body.age,
            bloodGroup: req.body.bloodGroup,
            image: req.file.filename,
            imageUrl: req.body.imageUrl,
            donarTimes: req.body.donarTimes,
            donar: req.body.donar,
            number: req.body.number,
            divisionId: req.body.divisionId,
            districtId: req.body.districtId,
            upazilaId: req.body.upazilaId,
            unionId: req.body.unionId,
            pc: req.body.pc,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(200).send({
            status: "success",
            message: "User created successfully!",
        });
    } catch (err) {
        res.status(500).send({
            status: "error",
            message: err.message,
        });
    }
});
// get all ready for blood user
router.get("/all", async (req, res) => {
    try {
        // const total_page = 8;
        // const page = parseInt(req.query.page || "0");
        // const total_user = await User.countDocuments({});
        const allUsers = await User.find({ donar: "1", donarTimes: "০" })
            .populate("divisionId")
            .populate("districtId")
            .populate("upazilaId")
            .populate("unionId")
            .select({
                __v: 0,
                password: 0,
            })
            .sort({ _id: -1 })
            // .limit(total_page)
            // .skip(total_page * page)
            .exec();
        res.status(200).send({
            allUsers,
            // totalPages: Math.ceil(total_user / total_page),
        });
    } catch (err) {
        res.status(500).send({
            error: err,
        });
    }
});
router.get("/donated", async (req, res) => {
    try {
        // const total_page = 8;
        // const page = parseInt(req.query.page || "0");
        // const total_user = await User.countDocuments({
        //     donar: "1",
        //     donarTimes: { $gte: "১" },
        // });
        const allDonated = await User.find({
            donar: "1",
            donarTimes: { $gte: "১" },
        })
            .populate("divisionId")
            .populate("districtId")
            .populate("upazilaId")
            .populate("unionId")
            .select({
                __v: 0,
                password: 0,
            })
            .sort({ _id: -1 })
            // .limit(total_page)
            // .skip(total_page * page)
            .exec();
        res.status(200).send({
            allDonated,
            // totalPages: Math.ceil(total_user / total_page),
        });
    } catch (err) {
        res.status(500).send({
            error: err,
        });
    }
});
// router.put("/addImage", async (req, res) => {
//     const { _id, imageUrl } = req.body;
//     try {
//         const user = await User.findById(_id);
//         if (user) {
//             user.imageUrl = imageUrl;
//             await user.save();
//             res.status(200).send({
//                 status: "success",
//                 message: "User created successfully!",
//             });
//         } else {
//             res.status(500).send({
//                 status: "error",
//                 message: "Server Error",
//             });
//         }
//     } catch (err) {
//         console.log(err.message);
//         res.status(500).send({
//             status: "error",
//             message: err.message,
//         });
//     }
// });
//login user
router.post("/login", async (req, res) => {
    try {
        const user = await User.find({ number: req.body.number });
        if (user && user.length > 0) {
            const isPasswordValid = await bcrypt.compare(
                req.body.password,
                user[0].password
            );
            if (isPasswordValid) {
                const token = jwt.sign(
                    {
                        id: user[0]._id,
                        name: user[0].name,
                        number: user[0].number,
                        imageUrl: user[0].imageUrl,
                        donar: user[0].donar,
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: "24h" }
                );
                res.status(200).send({
                    token: token,
                    message: "User logged in successfully!",
                });
            } else {
                res.status(401).json({
                    error: "Authentication failed.",
                });
            }
        } else {
            res.status(401).json({
                " error": "Authentication failed.",
            });
        }
    } catch (err) {
        res.status(500).json({
            " error": "Authentication failed.",
        });
    }
});
// token check middleware
router.get("/me", checkLogin, async (req, res) => {
    if (req.user) {
        res.status(200).send({
            user: req.user,
        });
    } else {
        res.status(404).send({
            error: "Authentication failed.",
        });
    }
});
// get a user
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({ _id: id })
            .populate("divisionId")
            .populate("districtId")
            .populate("upazilaId")
            .populate("unionId")
            .select({
                __v: 0,
                password: 0,
            });
        res.status(200).send({
            status: "success",
            data,
        });
    } catch (err) {
        res.status(500).send({
            error: "User Get Failed",
        });
    }
});

module.exports = router;

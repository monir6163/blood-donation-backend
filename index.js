const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const todoHandler = require("./routeHandler/todoHandler");
const userHandler = require("./routeHandler/userHandler");
const divisionHandler = require("./routeHandler/divisionHandler");
const districtHandler = require("./routeHandler/districtHandler");
const upazilaHandler = require("./routeHandler/upazilaHandler");
const unionHandler = require("./routeHandler/unionHandler");
const bloodRequest = require("./routeHandler/bloodRequest");
const port = process.env.PORT || 5000;
//express app intialization
const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//database connection with mongoose
mongoose
    .connect(
        `mongodb+srv://${process.env.User}:${process.env.Password}@cluster0.r1nyd.mongodb.net/blood?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("Could not connect to MongoDB...", err));

//application routes
app.use("/todo", todoHandler);
app.use("/user", userHandler);
app.use("/division", divisionHandler);
app.use("/district", districtHandler);
app.use("/upazila", upazilaHandler);
app.use("/union", unionHandler);
app.use("/blood", bloodRequest);

//error handling middleware
const errorHandler = (err, req, res, next) => {
    if (res.headerSent) {
        return next(err?.message);
    }
    res.status(500).json(err?.message);
};
app.use(errorHandler);
//default port
app.get("/", (req, res) => {
    res.send("Server is running");
});
app.listen(port, () => {
    console.log("Server is running on port", port);
});

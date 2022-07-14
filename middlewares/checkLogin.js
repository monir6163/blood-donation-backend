const jwt = require("jsonwebtoken");
const checkLogin = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        decoded.token = token;
        req.user = decoded;
        next();
    } catch (err) {
        next({
            error: err.message,
        });
    }
};
module.exports = checkLogin;

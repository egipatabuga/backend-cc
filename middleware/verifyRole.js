require('dotenv').config();
const jwt = require("jsonwebtoken");
const userEnums = require("../config/userEnums")

const checkIsOperator = async (req, res, next) => {
    let authorization = req.headers["authorization"]
    let token = authorization.split(' ')[1]

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: err.message
            });
        }

        if(decoded.type != userEnums.OPERATOR){
            return res.status(402).json({
                message: "Unathorization"
            })
        }

        next();
    });
}

module.exports = {
    checkIsOperator
}
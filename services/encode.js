const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "ods7f6sd7g678dsf6g8sdfhbstv76g8";

const encrypt = function encode(value, key) {
    return jwt.sign(
        {
            value: value
        },
        JWT_SECRET,
        {
            expiresIn: "24h"
        }
    );
};

function decrypt(token) {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.value;
}

function check(token) {
    jwt.verify(token, JWT_SECRET);
    return true;
}
module.exports = {check,encrypt,decrypt}
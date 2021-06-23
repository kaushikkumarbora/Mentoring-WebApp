const jwt = require("jsonwebtoken");
const config = require("./secret");
const db = require("../../database/database");
const Mentee = db.Mentee;
const Mentor = db.Mentor;

verifyMentee = (req, res) => {

}

verifyMentor = (req, res) => {
    //Mentor.
}

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).json({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        req.usertype = decoded.usertype;
        next();
    });
};

verifyUsertype = (req, res, next) => {
    if (req.body.usertype === 'mentor') {
        verifyMentor(req, res);
    }
    else if (req.body.usertype === 'mentee') {
        verifyMentee(req, res);
    }
    else {
        return res.status(403).json({
            message: "Invalid usertype!"
        });
    }
    next();
}

const authJwt = {
    verifyToken: verifyToken,
    verifyUsertype: verifyUsertype,
};

module.exports = authJwt;
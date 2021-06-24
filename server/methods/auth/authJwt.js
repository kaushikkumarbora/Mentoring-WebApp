const jwt = require("jsonwebtoken");
const config = require("./secret");
const db = require("../../database/database");
const mentee = db.mentee;
const mentor = db.mentor;

verifyMentee = (req, res, next) => {
    
    mentee.findByPk(req.userId)
        .then(user => next())
        .catch(
            err => {
                return res.status(401).json({
                    message: "Unauthorized!"
                });
            }
        );

}

verifyMentor = (req, res, next) => {

    mentor.findByPk(req.userId)
        .then(user => next())
        .catch(
            err => {
                return res.status(401).json({
                    message: "Unauthorized!"
                });
            }
        );

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
        console.log(decoded);
        req.userId = decoded.id;
        req.usertype = decoded.type.toLowerCase();
        next();
    });
};

verifyUsertype = (req, res, next) => {
    if (req.usertype === 'mentor') {
        verifyMentor(req, res, next);
    }
    else if (req.usertype === 'mentee') {
        verifyMentee(req, res, next);
    }
    else {
        return res.status(403).json({
            message: "Invalid usertype!"
        });
    }
}

const authJwt = {
    verifyToken: verifyToken,
    verifyUsertype: verifyUsertype,
};

module.exports = authJwt;
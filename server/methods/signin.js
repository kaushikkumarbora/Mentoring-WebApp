const db = require("../database/database");
const config = require("./auth/secret");

var jwt = require("jsonwebtoken");
var User;

const signin = (req, res) => {
    console.log('signin', req.body);
    // TODO fix when database is set
    if (req.body.usertype === 'Mentor') {
        User = db.mentor;
    }
    else if (req.body.usertype === 'Mentee') {
        User = db.mentee;
    }
    else {
        return res.status(404).json({ message: "User Not found." });
    }

    if(!req.body.username){
        return req.status(404).json({message: 'Username field empty'});
    }

    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (!user) {
            return res.status(404).json({ message: "User Not found." });
        }

        // let passwordIsValid = user.validatePassword(
        //     req.body.password,
        //     user.password
        // );

        let passwordIsValid = (user.password === req.body.password ? true : false);

        if (!passwordIsValid) {
            return res.status(401).json({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        var token = jwt.sign({ id: user.id, type: req.body.usertype }, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        return res.status(200).send({
            status: '200',
            id: user.id,
            username: user.username,
            usertype: req.body.usertype,
            accessToken: token
        });
    })

        // try { func({ id: '1', password: '123123234' }) }
        .catch (
        err => {
            return res.status(500).json({ message: err.message });
        }
        );
};

module.exports = signin;
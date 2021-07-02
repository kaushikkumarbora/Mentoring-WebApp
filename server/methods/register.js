const db = require("../database/database");

register = (req, res) => {
    console.log('register');
    const mentor = db.mentor;
    const mentee = db.mentee;
    const guardian = db.guardian;
    var user;
    if (req.body.first_name === '' || req.body.username === '' || req.body.password === '') {
        return req.status(400).json({ message: 'Bad Request' });
    }
    if (req.body.usertype === 'Mentor') {
        if (req.body.other_info === '') {
            return res.status(400).json({ message: 'Bad Request' });
        }
        mentor.findOne({
            where: {
                username: req.body.username
            }
        }).then((user) => {
            if (!user) {
                db.department.findOne({
                    where: {
                        id: req.body.other_info
                    }
                }).then((dept) => {
                    if (dept) {
                        mentor.create({
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            username: req.body.username,
                            password: req.body.password,
                            dept_id: req.body.other_info,
                            disabled: false
                        }).then(() => res.status(200).json({ status: '200' }));
                    }
                    else{
                        return res.status(400).json({ message: 'Bad request' });
                    }
                });
            }
            else{
                return res.status(400).json({ message: 'Bad request' });
            }
        });
    }
    else if (req.body.usertype === 'Mentee') {
        mentee.findOne({
            where: {
                username: req.body.username
            }
        }).then((user) => {
            if (!user) {
                mentee.create({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    username: req.body.username,
                    password: req.body.password,
                    disabled: false
                }).then(() => res.status(200).json({ status: '200' }));
            }
            else{
                return res.status(400).json({ message: 'Bad request' });
            }
        });
    }
    else if (req.body.usertype === 'Guardian') {
        if (req.body.other_info === '') {
            return res.status(400).json({ message: 'Bad Request' });
        }
        guardian.findOne({
            where: {
                username: req.body.username
            }
        }).then((user) => {
            if (!user) {
                mentee.findOne({
                    where: {
                        id: req.body.other_info
                    }
                }).then((mentee) => {
                    if (mentee) {
                        guardian.create({
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            username: req.body.username,
                            password: req.body.password,
                            mentee_id: req.body.other_info,
                        }).then(() => res.status(200).json({ status: '200' }));
                    }
                    else{
                        return res.status(400).json({ message: 'Bad request' });
                    }
                });
            }
            else{
                return res.status(400).json({ message: 'Bad request' });
            }
        });
    }
};

module.exports = register;
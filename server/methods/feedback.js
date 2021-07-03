const db = require("../database/database");

const UT_MENTOR = true;
const UT_MENTEE = false;

sendFeedback = async (req, res) => {
    console.log('feedback');
    const feedback = db.feedback;
    const mentor = db.mentor;
    const mentee = db.mentee;
    if (req.body.usertype.toLowerCase() === req.usertype) {
        return res.status(405).json({ message: "Cannot give feedback to  usertype same as the reporter." });
    }
    if (req.body.usertype.toLowerCase() === 'mentor') {
        mentor.findOne({
            where: {
                id: req.body.id
            }
        }).then((user) => {
            if (user) {
                feedback.create({
                    mentor_id: req.body.id,
                    mentee_id: req.userId,
                    description: req.body.title + ' <br> ' + req.body.description,
                    target_usertype: UT_MENTOR,
                }).then(() => res.status(200).json({ status: '200' }));
            }
            else {
                return res.status(400).json({ message: 'Wrong Target ID' });
            }
        })
    }
    else if (req.body.usertype.toLowerCase() === 'mentee') {
        mentee.findOne({
            where: {
                id: req.body.id
            }
        }).then((user) => {
            if (user) {
                feedback.create({
                    mentor_id: req.userId,
                    mentee_id: req.body.id,
                    description: req.body.title + ' <br> ' + req.body.description,
                    target_usertype: UT_MENTEE,
                }).then(() => res.status(200));
            }
            else {
                return res.status(400).json({ message: 'Wrong Target ID' });
            }
        })
    }
    else {
        return res.status(400).json({ message: 'Check usertype' });
    }
}

getFeedback = async (req, res) => {
    console.log('feedback');
    const feedback = db.feedback;
    if (req.usertype === 'mentor') {
        feedback.findAll({
            attributes: ['description'],
            where: {
                mentor_id: req.userId,
                target_usertype: UT_MENTOR
            }
        }).then((feedbacks) => res.status(200).json(feedbacks));
    }
    else if (req.usertype === 'mentee') {
        feedback.findAll({
            attributes: ['description'],
            where: {
                mentee_id: req.userId,
                target_usertype: UT_MENTEE
            }
        }).then((feedbacks) => res.status(200).json(feedbacks));
    }
    else {
        return res.status(400).json({ message: 'Check usertype' });
    }
}

module.exports = {
    sendFeedback,
    getFeedback,
}
const db = require("../database/database");

const UT_MENTOR = 1;
const UT_MENTEE = 0;

sendReport = async (req, res) => {
    console.log('report');
    const report = db.report;
    const mentor = db.mentor;
    const mentee = db.mentee;
    if (req.body.usertype.toLowerCase() === req.usertype) {
        return res.status(405).json({ message: "Cannot report usertype same as the reporter." });
    }
    if (req.body.usertype.toLowerCase() === 'mentor') {
        mentor.findOne({
            where: {
                id: req.body.id
            }
        }).then((user) => {
            if (user) {
                report.create({
                    mentor_id: req.body.id,
                    mentee_id: req.userId,
                    description: req.body.title + ' <br> ' + req.body.description,
                    target_usertype: UT_MENTOR,
                    status: 'waiting'
                }).then(() => res.status(200));
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
                report.create({
                    mentor_id: req.userId,
                    mentee_id: req.body.id,
                    description: req.body.title + ' <br> ' + req.body.description,
                    target_usertype: UT_MENTEE,
                    status: 'waiting'
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

module.exports = sendReport;
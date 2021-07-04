const moment = require("moment");

const db = require("../database/database");

sendmessage = async (req, res) => {
    console.log('sendmessage', req.body);
    if (req.usertype === 'mentor') {
        db.mentee.findOne({
            where: {
                id: req.body.userID,
            }
        }).then(user => {
            if (user) {
                db.mentor_mentee.findAll({
                    where: {
                        mentor_id: req.userId,
                        mentee_id: req.body.userID
                    },
                    order: [['id', 'DESC']]
                }).then((mentor_mentees) => {
                    if (mentor_mentees) {
                        if (mentor_mentees[0].end_date === null) {
                            db.sequelize.query(
                                'SELECT cm.* FROM chat_mapping cm WHERE cm.mentor_id = :mentor_id AND cm.mentee_id = :mentee_id ORDER BY cm.date DESC;',
                                {
                                    replacements: { mentor_id: req.userId, mentee_id: req.body.userID },
                                    type: db.sequelize.QueryTypes.SELECT
                                }
                            ).then((sessions) => {
                                if (sessions.length) {
                                    if (sessions[0].date === moment().format('YYYY-MM-DD')) {
                                        db.message.create({
                                            chat_id: sessions[0].id,
                                            text: req.body.text,
                                            message_by: 'mentor',
                                            time: moment().format('HH:mm:ss.SSSS'),
                                            date: moment().format('YYYY-MM-DD')
                                        }).then((entry) => res.status(200).json({
                                            status: '200',
                                            id: entry.id,
                                            date: entry.date,
                                            time: entry.time,
                                        }))
                                    }
                                    else {
                                        db.chat_mapping.create({
                                            mentor_id: req.userId,
                                            mentee_id: req.body.userID
                                        }).then((entry) => {
                                            db.message.create({
                                                chat_id: entry.id,
                                                text: req.body.text,
                                                message_by: 'mentor',
                                                time: moment().format('HH:mm:ss.SSSS'),
                                                date: moment().format('YYYY-MM-DD')
                                            }).then((entry) => res.status(200).json({
                                                status: '200',
                                                id: entry.id,
                                                date: entry.date,
                                                time: entry.time,
                                            }))
                                        })
                                    }
                                }
                            })
                        }
                        else {
                            return res.status(400).json({ message: 'Bad Request' });
                        }
                    }
                    else {
                        return res.status(400).json({ message: 'Bad Request' });
                    }
                })
            }
            else {
                return res.status(400).json({ message: 'Bad Request' });
            }
        })
    }
    else if (req.usertype === 'mentee') {
        db.mentor.findOne({
            where: {
                id: req.body.userID,
            }
        }).then(user => {
            if (user) {
                db.mentor_mentee.findAll({
                    where: {
                        mentor_id: req.body.userID,
                        mentee_id: req.userId
                    },
                    order: [['id', 'DESC']]
                }).then((mentor_mentees) => {
                    if (mentor_mentees) {
                        if (mentor_mentees[0].end_date === null) {
                            db.sequelize.query(
                                'SELECT cm.* FROM chat_mapping cm WHERE cm.mentor_id = :mentor_id AND cm.mentee_id = :mentee_id ORDER BY cm.date DESC;',
                                {
                                    replacements: { mentor_id: req.body.userID, mentee_id: req.userId },
                                    type: db.sequelize.QueryTypes.SELECT
                                }
                            ).then((sessions) => {
                                if (sessions.length) {
                                    console.log(moment().format('HH:mm:ss.SSSSSS'));
                                    if (sessions[0].date === moment().format('YYYY-MM-DD')) {
                                        db.message.create({
                                            chat_id: sessions[0].id,
                                            text: req.body.text,
                                            message_by: 'mentee',
                                            time: moment().format('HH:mm:ss.SSSSSS'),
                                            date: moment().format('YYYY-MM-DD')
                                        }).then((entry) => res.status(200).json({
                                            status: '200',
                                            id: entry.id,
                                            date: entry.date,
                                            time: entry.time,
                                        }))
                                    }
                                    else {
                                        db.chat_mapping.create({
                                            mentor_id: req.body.userID,
                                            mentee_id: req.userId
                                        }).then((entry) => {
                                            db.message.create({
                                                chat_id: entry.id,
                                                text: req.body.text,
                                                message_by: 'mentee',
                                                time: moment().format('HH:mm:ss.SSSSSS'),
                                                date: moment().format('YYYY-MM-DD')
                                            }).then((entry) => res.status(200).json({
                                                status: '200',
                                                id: entry.id,
                                                date: entry.date,
                                                time: entry.time,
                                            }))
                                        })
                                    }
                                }
                            })
                        }
                        else {
                            return res.status(400).json({ message: 'Bad Request' });
                        }
                    }
                    else {
                        return res.status(400).json({ message: 'Bad Request' });
                    }
                })
            }
            else {
                return res.status(400).json({ message: 'Bad Request' });
            }
        })
    }
}

module.exports = sendmessage;
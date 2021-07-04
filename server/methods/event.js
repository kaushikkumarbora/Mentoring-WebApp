const moment = require("moment");
const db = require("../database/database");


sendEvent = (req, res) => {
    console.log('event', req.body);
    const event = db.event;
    const mentor = db.mentor;
    const mentee = db.mentee;
    if (req.body.usertype.toLowerCase() === req.usertype) {
        return res.status(405).json({ message: "Cannot make event with usertype same as the reporter." });
    }
    if (req.body.date < moment().format('YYYY-MM-DD')) {
        return res.status(405).json({ message: "Incorrect Date!" });
    }
    if (req.body.usertype.toLowerCase() === 'mentor') {
        mentor.findOne({
            where: {
                id: req.body.id
            }
        }).then((user) => {
            if (user) {
                event.findOne({
                    where: {
                        mentor_id: req.body.id,
                        mentee_id: req.userId,
                        date: req.body.date,
                        status: {[db.Sequelize.Op.ne]: 'expired'}
                    }
                }).then((data) => {
                    if (data) {
                        event.update({
                            start_time: req.body.time,
                            venue: req.body.venue,
                            status: 'waiting',
                            description: 'Title: ' + req.body.title + '\nDescription: ' + req.body.description + '\n Additional Info: ' + req.body.add,
                        },
                            {
                                where: {
                                    mentor_id: req.body.id,
                                    mentee_id: req.userId,
                                    date: req.body.date,
                                }
                            }).then(() => res.status(200).json({ status: '200' }));
                    }
                    else {
                        console.log('here');
                        event.create({
                            mentor_id: req.body.id,
                            mentee_id: req.userId,
                            start_time: req.body.time,
                            venue: req.body.venue,
                            date: req.body.date,
                            status: 'waiting',
                            description: 'Title: ' + req.body.title + '\nDescription: ' + req.body.description + '\n Additional Info: ' + req.body.add,
                        }).then(() => res.status(200).json({ status: '200' }));
                    }
                })
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
                event.findOne({
                    where: {
                        mentor_id: req.userId,
                        mentee_id: req.body.id,
                        date: req.body.date,
                        status: {[db.Sequelize.Op.ne]: 'expired'}
                    }
                }).then((data) => {
                    if (data) {
                        event.update({
                            start_time: req.body.time,
                            venue: req.body.venue,
                            status: 'waiting',
                            description: 'Title: ' + req.body.title + '\nDescription: ' + req.body.description + '\n Additional Info: ' + req.body.add,
                        },
                            {
                                where: {
                                    mentor_id: req.userId,
                                    mentee_id: req.body.id,
                                    date: req.body.date,
                                }
                            }).then(() => res.status(200).json({ status: '200' }));
                    }
                    else {
                        event.create({
                            mentor_id: req.userId,
                            mentee_id: req.body.id,
                            start_time: req.body.time,
                            venue: req.body.venue,
                            date: req.body.date,
                            status: 'waiting',
                            description: 'Title: ' + req.body.title + '\nDescription: ' + req.body.description + '\n Additional Info: ' + req.body.add,
                        }).then(() => res.status(200));
                    }
                })
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

getEvent = (req, res) => {
    console.log('event');
    const event = db.event;

    if (req.usertype === 'mentor') {
        event.findAll({
            where: {
                mentor_id: req.userId
            },
            include: [{
                model: db.mentee, as: 'mentee',
                attributes: ['first_name', 'last_name', 'id']
            }]
        }).then((events) => res.status(200).json(events));
    }
    else if (req.usertype === 'mentee') {
        event.findAll({
            where: {
                mentee_id: req.userId
            },
            include: [{
                model: db.mentor, as: 'mentor',
                attributes: ['first_name', 'last_name', 'id']
            }]
        }).then((events) => res.status(200).json(events));
    }
    return;
}

approveEvent = (req, res) => {
    console.log('event');
    const event = db.event;

    if (req.usertype === 'mentor') {
        event.findOne({
            where: {
                id: req.params.eventID
            },
        }).then((eventdetails) => {
            if (eventdetails) {
                event.update({
                    status: 'approved'
                }, {
                    where: {
                        id: req.params.eventID
                    }
                }).then(() => res.status(200).json({ message: 'approved' }))
            }
            else {
                return res.status(400).json({ message: 'Bad Request' });
            }
        });
    }
    else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = {
    sendEvent,
    getEvent,
    approveEvent
}
const db = require("../database/database");


sendEvent = (req, res) => {
    console.log('event');
    console.log(req.body.date,req.body.time);
    return res.status(200).json({ status: '200' });
}

getEvent = (req, res) => {
    console.log('event');
    return;
}

module.exports = {
    sendEvent,
    getEvent,
}
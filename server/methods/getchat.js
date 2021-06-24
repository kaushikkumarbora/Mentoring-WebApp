const db = require("../database/database");
const department = require("../database/models/department");
const mentee = require("../database/models/mentee");
const mentor = require("../database/models/mentor");

/*json requires
mentee
{
    "mentor_id":"1",
    "start_date":"2021-04-20",
    "end_date":null,
    "mentor":{
        "first_name":"Aston",
        "last_name":"Montoya",
        "dept":{
            "name":"Electronics Engineering"
        }
    }
}
    */

getchat = async (req, res) => {
    console.log('getchat');
    const mentor_mentee = db.mentor_mentee;
    if (req.params.otherID === '0') {
        if (req.usertype === 'mentor') {
            mentor_mentee.findAll({
                attributes: ['mentee_id', 'start_date', 'end_date'],
                include: [{
                    model: db.mentee, as: 'mentee',
                    attributes: ['first_name', 'last_name']
                }],
                where: {
                    mentor_id: req.userId,
                    end_date: null
                }
            }).then(chats => res.status(200).json(chats));
        }
        else {
            mentor_mentee.findAll({
                attributes: ['mentor_id', 'start_date', 'end_date'],
                include: [{
                    model: db.mentor, as: 'mentor',
                    attributes: ['first_name', 'last_name'],
                    include: [{
                        model: db.department, as: 'dept',
                        attributes: ['name']
                    }]
                }],
                where: {
                    mentee_id: req.userId,
                    end_date: null
                }
            }).then(chats => res.status(200).json(chats));
        }
    }
    else {
        // if (req.usertype === 'mentor') {
        //     mentor_mentee.findAll({
        //         where: {
        //             mentor_id: req.userId,
        //             mentee_id: req.otherID,
        //             end_date: null
        //         }
        //     }).then(chats => console.log(json(chats)))
        // }
        // else {
        //     mentor_mentee.findAll({
        //         where: {
        //             mentee_id: req.userId,
        //             mentor_id: otherID,
        //             end_date: null
        //         }
        //     }).then(chats => console.log(json(chats)))
        // }
    }
}

module.exports = getchat;
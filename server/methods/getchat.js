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
            // db.sequelize.query("SELECT mma.start_date, mma.end_date, mm.mentor_id, mm.mentee_id FROM mentor_mentee mma INNER JOIN (SELECT mentor_id, mentee_id, MAX(id) id FROM mentor_mentee GROUP BY mentor_id, mentee_id) mm ON mma.mentor_id = mm.mentor_id AND mma.mentee_id = mm.mentee_id WHERE mm.mentee_id = :mentor_ID",
            //     {
            //         replacements: { mentor_ID: req.userId},
            //         type: db.Sequelize.QueryTypes.SELECT
            //     }
            // )
            mentor_mentee.findAll({
                where: {
                    mentor_id: req.userId,
                },
                attributes: ['mentor_mentee.mentee_id', [db.sequelize.fn('MAX', db.sequelize.col('mentor_mentee.id')), 'id']],
                group: ['mentor_mentee.mentor_id', 'mentor_mentee.mentee_id', 'mentor_mentee.start_date', 'mentor_mentee.end_date', 'mentee.id', 'id_mentor_mentee.id'],
                include: [
                    {
                        model: db.mentee, as: 'mentee',
                        attributes: ['first_name', 'last_name'],
                        required: false
                    },
                    {
                        model: db.mentor_mentee, as: 'id_mentor_mentee',
                        attributes: ['start_date', 'end_date'],
                        required: false
                    }]
            }).then(chats => res.status(200).json(chats));
        }
        else {
            mentor_mentee.findAll({
                where: {
                    mentee_id: req.userId,
                },
                attributes: ['mentor_mentee.mentor_id', [db.sequelize.fn('MAX', db.sequelize.col('mentor_mentee.id')), 'id']],
                group: ['mentor_mentee.mentor_id', 'mentor_mentee.mentee_id', 'mentor_mentee.start_date', 'mentor_mentee.end_date', 'mentor.id', 'id_mentor_mentee.id', 'mentor->dept.id'],
                include: [
                    {
                        model: db.mentor, as: 'mentor',
                        attributes: ['first_name', 'last_name'],
                        include: [{
                            model: db.department, as: 'dept',
                            attributes: ['name']
                        }]
                    },
                    {
                        model: db.mentor_mentee, as: 'id_mentor_mentee',
                        attributes: ['start_date', 'end_date'],
                        required: false
                    }]
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
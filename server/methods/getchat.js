const db = require("../database/database");

getchat = async (req, res) => {
    console.log('getchat');
    if (req.params.otherID === '0') {
        if (req.usertype === 'mentor') {
            db.sequelize.query(
                'SELECT mm.*, m.first_name, m.last_name, m.dob FROM mentor_mentee mm INNER JOIN (SELECT mentor_id, mentee_id, MAX(id) AS maxid FROM mentor_mentee GROUP BY mentor_id, mentee_id) mmm ON mm.mentor_id = mmm.mentor_id AND mm.id = mmm.maxid AND mm.mentee_id = mmm.mentee_id INNER JOIN (SELECT first_name, last_name, dob, id FROM mentee) m ON mm.mentee_id = m.id WHERE mm.mentor_id = :mentorid;',
                {
                    replacements: { mentorid: req.userId },
                    type: db.sequelize.QueryTypes.SELECT
                }
            ).then(chats => res.status(200).json(chats));
        }
        else {
            db.sequelize.query(
                'SELECT mm.*, m.first_name, m.last_name, m.dob, m.dept_name FROM mentor_mentee mm INNER JOIN (SELECT mentor_id, mentee_id, MAX(id) AS maxid FROM mentor_mentee GROUP BY mentor_id, mentee_id) mmm ON mm.mentor_id = mmm.mentor_id AND mm.id = mmm.maxid AND mm.mentee_id = mmm.mentee_id INNER JOIN (SELECT k.first_name, k.last_name, k.dob, k.id, k.dept_id, d.name AS dept_name FROM mentor k INNER JOIN (SELECT name, id FROM department) d ON d.id = k.dept_id) m ON mm.mentor_id = m.id WHERE mm.mentee_id = :menteeid;',
                {
                    replacements: { menteeid: req.userId },
                    type: db.sequelize.QueryTypes.SELECT
                }
            ).then(chats => res.status(200).json(chats));
        }
    }
    else {
    }
}

module.exports = getchat;
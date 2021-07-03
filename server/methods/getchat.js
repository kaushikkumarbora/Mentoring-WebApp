const db = require("../database/database");

getchat = async (req, res) => {
    console.log('getchat', req.params, req.query);
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
        if ( req.query.userID === 'null') {
            return res.status(400).json({ message: 'Bad Request' });
        }
        else if ( req.query.latestMessageDate === 'null' &&  req.query.latestMessageId === 'null') {
            if (req.usertype === 'mentee') {
                console.log( req.query.userID);
                db.sequelize.query(
                    'SELECT cm.date, m.text, m.time, m.id, m.message_by FROM chat_mapping cm JOIN message m ON cm.id = m.chat_id AND cm.date = m.date WHERE cm.mentor_id = :mentor_id AND cm.mentee_id = :mentee_id ORDER BY cm.date, m.id;',
                    {
                        replacements: { mentee_id: req.userId, mentor_id:  req.query.userID },
                        type: db.sequelize.QueryTypes.SELECT
                    }
                ).then(messages => res.status(200).json(messages));
            }
            else if (req.usertype === 'mentor') {
                db.sequelize.query(
                    'SELECT cm.date, m.text, m.time, m.id, m.message_by FROM chat_mapping cm JOIN message m ON cm.id = m.chat_id AND cm.date = m.date WHERE cm.mentor_id = :mentor_id AND cm.mentee_id = :mentee_id ORDER BY cm.date, m.id;',
                    {
                        replacements: { mentor_id: req.userId, mentee_id:  req.query.userID },
                        type: db.sequelize.QueryTypes.SELECT
                    }
                ).then(messages => res.status(200).json(messages));
            }

        }
        else if ( req.query.latestMessageDate === 'null' ||  req.query.latestMessageId === 'null') {
            return res.status(400).json({ message: 'Bad Request' });
        }
        else {
            if (req.usertype === 'mentee') {
                db.sequelize.query(
                    'SELECT cm.date, m.text, m.time, m.id, m.message_by FROM chat_mapping cm JOIN message m ON cm.id = m.chat_id AND cm.date = m.date WHERE cm.mentee_id = :mentee_id AND cm.mentor_id = :mentor_id AND (cm.date > :date OR (cm.date = :date AND m.id > :id)) ORDER BY cm.date, m.id;',
                    {
                        replacements: { mentor_id:  req.query.userID, mentee_id: req.userId, date:  req.query.latestMessageDate, id:  req.query.latestMessageId },
                        type: db.sequelize.QueryTypes.SELECT
                    }
                ).then(messages => res.status(200).json(messages));
            }
            else if (req.usertype === 'mentor') {
                db.sequelize.query(
                    'SELECT cm.date, m.text, m.time, m.id, m.message_by FROM chat_mapping cm JOIN message m ON cm.id = m.chat_id AND cm.date = m.date WHERE cm.mentee_id = :mentee_id AND cm.mentor_id = :mentor_id AND (cm.date > :date OR (cm.date = :date AND m.id > :id)) ORDER BY cm.date, m.id;',
                    {
                        replacements: { mentor_id: req.userId, mentee_id:  req.query.userID, date:  req.query.latestMessageDate, id:  req.query.latestMessageId },
                        type: db.sequelize.QueryTypes.SELECT
                    }
                ).then(messages => res.status(200).json(messages));
            }
        }
    }
}

module.exports = getchat;
const moment = require("moment");
const db = require("../database/database");

register = async (req, res) => {
    console.log('mentor_register');
    if (req.usertype === 'mentor') {
        db.mentor_register_info.findAll({
            where: {
                mentor_id: req.userId
            },
            order: [['id', 'DESC']]
        }).then((mentor_register_history) => {
            if (mentor_register_history) {
                if (mentor_register_history[0].date_recuse === null) {
                    return res.status(400).json({ message: 'Already Registered' });
                }
                else {
                    db.mentor_register_info.create({
                        mentor_id: req.userId,
                        date_register: moment().format('YYYY-MM-DD'),
                    }).then(() => res.status(200).json({ status: '200' }))
                }
            }
            else {
                db.mentor_register_info.create({
                    mentor_id: req.userId,
                    date_register: moment().format('YYYY-MM-DD'),
                }).then(() => res.status(200).json({ status: '200' }))
            }
        })
    }
    else {
        return res.status(400).json({ message: 'Check usertype' });
    }
}

recuse = async (req, res) => {
    console.log('mentor_recuse');
    if (req.usertype === 'mentor') {
        db.mentor_register_info.findAll({
            where: {
                mentor_id: req.userId
            },
            order: [['id', 'DESC']]
        }).then((mentor_register_history) => {
            if (mentor_register_history) {
                if (mentor_register_history[0].date_recuse === null) {
                    db.mentor_register_info.update({
                        date_recuse: moment().format('YYYY-MM-DD')},{
                        where:{
                            id: mentor_register_history[0].id
                        }                       
                    }).then(() => res.status(200).json({ status: '200' }))
                }
                else {
                    return res.status(400).json({ message: 'Already Recused' });
                }
            }
            else {
                return res.status(400).json({ message: 'Not Registered' });
            }
        })
    }
    else {
        return res.status(400).json({ message: 'Check usertype' });
    }
}

getstatus = async (req, res) => {
    console.log('mentor_getstatus');
    if (req.usertype === 'mentor') {
        db.mentor_register_info.findAll({
            where: {
                mentor_id: req.userId
            },
            order: [['id', 'DESC']]
        }).then((mentor_register_history) => {
            if (mentor_register_history) {
                if (mentor_register_history[0].date_recuse === null) {
                    return res.status(200).json({ status: 'Active' });
                }
                else {
                    return res.status(200).json({ status: 'Inactive' });
                }
            }
            else {
                return res.status(200).json({ status: 'Inactive' });
            }
        })
    }
    else {
        return res.status(400).json({ message: 'Check usertype' });
    }
}

module.exports = { 
    register,
    recuse,
    getstatus
};
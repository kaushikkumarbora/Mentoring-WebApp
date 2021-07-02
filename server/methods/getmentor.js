const db = require("../database/database");

getmentor = async (req, res) => {
    console.log('getmentor');
    if (req.params.mentorID === '0') {
        if (req.usertype === 'mentor') {
            return res.status(401).json({ message: "Unauthorized" });
        }
        else if (req.usertype === 'mentee') {
            db.sequelize.query(
                'SELECT m.id, m.first_name, m.last_name, m.dob, d.dept_name, r.date_register, r.date_recuse FROM mentor m INNER JOIN( SELECT mri.id, mri.date_register, mri.date_recuse, mri.mentor_id FROM mentor_register_info mri INNER JOIN( SELECT MAX(id) AS maxid, mentor_id FROM mentor_register_info GROUP BY mentor_id) mr ON mri.id = mr.maxid AND mri.mentor_id = mr.mentor_id) r ON m.id = r.mentor_id INNER JOIN( SELECT name AS dept_name, id FROM department) d ON m.dept_id = d.id;',
                {
                    type: db.sequelize.QueryTypes.SELECT
                }
            ).then(mentors => res.status(200).json(mentors));
        }
        else {
            return res.status(400).json({ message: 'Check usertype' });
        }
    }
}

module.exports = getmentor;
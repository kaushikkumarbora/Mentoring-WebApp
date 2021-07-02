const db = require("../database/database");

getmentee = async (req, res) => {
    console.log('getmentee');
    const mentee = db.mentee;
    if (req.params.menteeID === '0') {
        if (req.usertype === 'mentor') {
            mentee.findAll({
                attributes: ['id', 'first_name', 'last_name', 'dob']
            }).then(mentees => res.status(200).json(mentees));
        }
        else if (req.usertype === 'mentee') {
            return res.status(401).json({ message: "Unauthorized" });
        }
        else {
            return res.status(400).json({ message: 'Check usertype' });
        }
    }
}

module.exports = getmentee;


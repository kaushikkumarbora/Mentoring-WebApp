const db = require("../database/database");

/*json requires
        {
            status: '',
            chats: [
                {
                    mentor_first_name: '',
                    mentor_last_name: '',
                    expired: true/false,
                    department: '',
                    start_date: '',
                    end_date: ''
            },{}...]
        }
    */

getchat = async (req, res) => {
    console.log('getchat');
    const chat = db.chat;
    const chat_period = db.chat_period;
    if (req.chatID === 0) {
        
    }
    return res.status(200).json();
}

module.exports = getchat;
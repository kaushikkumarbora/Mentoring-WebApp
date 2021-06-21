module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("message", {
        msg_id: {
            type: Sequelize.DataTypes.INTEGER, allowNull: false
        },
        date: {
            type: Sequelize.DataTypes.DATE, allowNull: false
        },
        chat_id: {
            type: Sequelize.DataTypes.INTEGER, allowNull: false
        },
        mentor_msg: {
            type: Sequelize.DataTypes.STRING, allowNull: false
        },
        mentee_msg: {
            type: Sequelize.DataTypes.STRING, allowNull: false
        }
    });

    return Message;
};
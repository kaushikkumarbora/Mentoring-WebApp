module.exports = (sequelize, Sequelize) => {
    const Chat = sequelize.define("chat_mappings", {
        chat_id: {
            type: Sequelize.DataTypes.INTEGER, allowNull: false
        },
        date: {
            type: Sequelize.DataTypes.DATE, allowNull: false
        },
        mentor_id: {
            type: Sequelize.DataTypes.INTEGER, allowNull: false
        },
        mentee_id: {
            type: Sequelize.DataTypes.INTEGER, allowNull: false
        }
    });

    return Chat;
};
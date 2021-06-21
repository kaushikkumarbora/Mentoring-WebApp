module.exports = (sequelize, Sequelize) => {
    const Recuse = sequelize.define("recuse", {
        serial: {
            type: Sequelize.DataTypes.INTEGER, allowNull: false
        },
        mentor_id: {
            type: Sequelize.DataTypes.INTEGER, allowNull: false
        },
        date_recuse: {
            type: Sequelize.DataTypes.DATE, allowNull: false
        }
    });

    return Recuse;
};
module.exports = (sequelize, Sequelize) => {
    const Register = sequelize.define("register", {
        serial: {
            type: Sequelize.DataTypes.INTEGER, allowNull: false
        },
        mentor_id: {
            type: Sequelize.DataTypes.INTEGER, allowNull: false
        },
        date_register: {
            type: Sequelize.DataTypes.DATE, allowNull: false
        }
    });

    return Register;
};
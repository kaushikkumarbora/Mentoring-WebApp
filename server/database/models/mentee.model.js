module.exports = (sequelize, Sequelize) => {
    const Mentee = sequelize.define("mentee", {
        id: {
            type: Sequelize.DataTypes.INTEGER, allowNull: false
        },
        first_name: {
            type: Sequelize.DataTypes.STRING, allowNull: false
        },
        last_name: {
            type: Sequelize.DataTypes.STRING, allowNull: false
        },
        username: {
            type: Sequelize.DataTypes.STRING, allowNull: false
        },
        password: {
            type: Sequelize.DataTypes.STRING, allowNull: false
        },
        dob: {
            type: Sequelize.DataTypes.DATE, allowNull: false
        }
    });

    return Mentee;
};
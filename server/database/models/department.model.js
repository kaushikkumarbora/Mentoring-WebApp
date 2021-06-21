module.exports = (sequelize, Sequelize) => {
    const Department = sequelize.define("department", {
        id: {
            type: Sequelize.DataTypes.INTEGER, allowNull: false
        },
        name: {
            type: Sequelize.DataTypes.STRING, allowNull: false
        }
    });

    return Department;
};
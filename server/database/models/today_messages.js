const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('today_messages', {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    message_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'today_messages',
    schema: 'public',
    timestamps: false
  });
};

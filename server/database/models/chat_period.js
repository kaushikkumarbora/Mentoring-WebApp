const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chat_period', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'chat',
        key: 'id'
      }
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'chat_period',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "chat_period_pkey",
        unique: true,
        fields: [
          { name: "id" },
          { name: "start_date" },
        ]
      },
    ]
  });
};

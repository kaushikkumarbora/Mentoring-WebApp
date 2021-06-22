const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('message', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    chat_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'chat',
        key: 'id'
      }
    },
    message_by_mentor: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    message_by_mentee: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    timestamp_mentor: {
      type: DataTypes.DATE,
      allowNull: false
    },
    timestamp_mentee: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'message',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "message_pkey",
        unique: true,
        fields: [
          { name: "chat_id" },
          { name: "id" },
        ]
      },
    ]
  });
};

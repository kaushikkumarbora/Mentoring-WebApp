const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('message', {
    chat_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'chat_mapping',
        key: 'id'
      }
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: "CURRENT_TIME"
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_DATE'),
      primaryKey: true,
      references: {
        model: 'chat_mapping',
        key: 'id'
      }
    },
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    message_by: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'message',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "fki_message_session_id_date",
        fields: [
          { name: "chat_id" },
          { name: "date" },
        ]
      },
      {
        name: "message_pkey",
        unique: true,
        fields: [
          { name: "chat_id" },
          { name: "date" },
          { name: "id" },
        ]
      },
    ]
  });
};

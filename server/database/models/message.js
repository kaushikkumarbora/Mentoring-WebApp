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
        model: 'chat_mapping',
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
    time_mentor_msg: {
      type: DataTypes.TIME,
      allowNull: true
    },
    time_mentee_msg: {
      type: DataTypes.TIME,
      allowNull: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'chat_mapping',
        key: 'id'
      }
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
          { name: "id" },
          { name: "chat_id" },
          { name: "date" },
        ]
      },
    ]
  });
};

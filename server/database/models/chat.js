const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chat', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    mentor_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'mentor',
        key: 'id'
      },
      unique: "chat_unique_mentor_mentee"
    },
    mentee_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'mentee',
        key: 'id'
      },
      unique: "chat_unique_mentor_mentee"
    }
  }, {
    sequelize,
    tableName: 'chat',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "chat_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "chat_unique_mentor_mentee",
        unique: true,
        fields: [
          { name: "mentor_id" },
          { name: "mentee_id" },
        ]
      },
    ]
  });
};

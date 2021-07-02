const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('feedback', {
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
      }
    },
    mentee_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'mentee',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    target_usertype: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'feedback',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "feedback_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

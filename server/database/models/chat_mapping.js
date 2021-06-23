const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chat_mapping', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_DATE'),
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
    }
  }, {
    sequelize,
    tableName: 'chat_mapping',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "chat_mappings_pkey",
        unique: true,
        fields: [
          { name: "id" },
          { name: "date" },
        ]
      },
    ]
  });
};

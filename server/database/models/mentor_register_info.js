const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mentor_register_info', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'mentor_register_info',
        key: 'id'
      }
    },
    mentor_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'mentor',
        key: 'id'
      }
    },
    date_register: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    date_recuse: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'mentor_register_info',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "mentor_register_info_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mentor_mentee', {
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
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
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'mentor_mentee',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'mentor_mentee',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "mentor_mentee_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

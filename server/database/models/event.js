const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('event', {
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
    start_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: true
    },
    status: {
      type: DataTypes.ARRAY(DataTypes.BOOLEAN),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    venue: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'event',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "event_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

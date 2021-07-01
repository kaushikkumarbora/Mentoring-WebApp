const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('guardian', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    last_name: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    username: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      unique: "guardian_username"
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    mentee_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'mentee',
        key: 'id'
      },
      unique: "guardian_username"
    }
  }, {
    sequelize,
    tableName: 'guardian',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "guardian_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "guardian_username",
        unique: true,
        fields: [
          { name: "username" },
          { name: "mentee_id" },
        ]
      },
    ]
  });
};

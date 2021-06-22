const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mentor', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "mentor_uname"
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    dept_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'department',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'mentor',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "mentor_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "mentor_uname",
        unique: true,
        fields: [
          { name: "username" },
        ]
      },
    ]
  });
};

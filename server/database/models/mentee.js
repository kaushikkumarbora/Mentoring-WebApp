const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mentee', {
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
      unique: "mentee_uname"
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'mentee',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "mentee_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "mentee_uname",
        unique: true,
        fields: [
          { name: "username" },
        ]
      },
    ]
  });
};

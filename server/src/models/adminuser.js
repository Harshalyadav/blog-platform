// models/User.js
const { DataTypes } = require("sequelize");
const sequelize = require('../config/db.config');

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  }
}, {
  freezeTableName: true,
  timestamps: true,
  createdAt: true,
  updatedAt: true,
    tableName: "users"
});

module.exports = User;

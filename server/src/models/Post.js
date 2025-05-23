const { DataTypes } = require("sequelize");
const sequelize = require('../config/db.config');

// Define the Post model
const Post = sequelize.define("Post", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: true,        // adds createdAt and updatedAt automatically
  createdAt: true,
  updatedAt: true   ,  
  tableName: 'Post',     // you had it commented out before
});

// Associations should be added inside the index.js (not directly in model file)
module.exports = Post;

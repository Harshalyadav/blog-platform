const User = require('./adminuser'); // your user model file
const Post = require('./Post');      // your post model file

// Define associations between models
User.hasMany(Post, { foreignKey: 'author_id', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'author_id', as: 'author' });

module.exports = {
  User,
  Post,
};

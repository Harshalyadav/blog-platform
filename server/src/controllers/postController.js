
const { Post, User } = require('../models');
// Create a new post
exports.createPost = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
    author_id: req.userId, // assume you have set req.userId from auth middleware
    });

    return res.status(201).json({
      status: true,
      code: 201,
      message: "Post created successfully",
      data: post,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: false,
      code: 500,
      message: "Post creation failed",
      error: err.message,
    });
  }
};




exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{
        model: User,
        as: 'author',          // <-- use the alias defined in the association
        attributes: ['username']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      code: 500,
      message: "Error fetching posts",
      error: error.message,
    });
  }
};
// Get a single post by ID
exports.getSinglePost = async (req, res) => {
  try {
    console.log("req.params.id", req.params.id);
    const post = await Post.findByPk(req.params.id, {
   include: [{ model: User, as: 'author', attributes: ["id", "username", "email"] }],
    });
console.log("post", post);
    if (!post) {
      return res.status(404).json({
        status: false,
        code: 404,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      status: true,
      code: 200,
      message: "Post fetched successfully",
      data: post,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: false,
      code: 500,
      message: "Error fetching post",
      error: err.message,
    });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({
        status: false,
        code: 404,
        message: "Post not found",
      });
    }

    if (post.UserId !== req.userId) {
      return res.status(403).json({
        status: false,
        code: 403,
        message: "Unauthorized to update this post",
      });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    await post.save();

    return res.status(200).json({
      status: true,
      code: 200,
      message: "Post updated successfully",
      data: post,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: false,
      code: 500,
      message: "Error updating post",
      error: err.message,
    });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
console.log("post", post);
    if (!post) {
      return res.status(404).json({
        status: false,
        code: 404,
        message: "Post not found",
      });
    }

    if (post.author_id !== req.userId) {
      return res.status(403).json({
        status: false,
        code: 403,
        message: "Unauthorized to delete this post",
      });
    }

    await post.destroy();

    return res.status(200).json({
      status: true,
      code: 200,
      message: "Post deleted successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: false,
      code: 500,
      message: "Error deleting post",
      error: err.message,
    });
  }
};


exports.getMyPosts = async (req, res) => {
  try {
    console.log("req.username.id", req.userId);
    const posts = await Post.findAll({
      where: { author_id: req.userId }
    });
    res.json({ posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.id,
        author_id: req.user.id
      }
    });

    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch post' });
  }
};
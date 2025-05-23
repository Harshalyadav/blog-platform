// const express = require("express");
// const router = express.Router();
// // const auth = require("../middleware/authMiddleware");
// // const adminOnly = require("../middleware/roleMiddleware");
// // const { getAllUsers, getAllPosts, deletePost } = require("../../controllers/adminController");

// // router.get("/users", auth, adminOnly, getAllUsers);
// // router.get("/posts", auth, adminOnly, getAllPosts);
// // router.delete("/posts/:id", auth, adminOnly, deletePost);

// module.exports = router;

const auth = require("../middlewares/authMiddleware");
const express = require("express");
const {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
  getMyPosts,
  getPostById
} = require("../controllers/postController");
const router = express.Router();

router.post("/add", auth, createPost);
router.get("/mine", auth, getMyPosts);
// router.get("/:id", auth, getPostById);
router.get("/", getAllPosts);
router.get("/:id", getSinglePost);
router.put("/update/:id", auth, updatePost);
router.delete("/delete/:id", auth, deletePost);

module.exports = router;
const express = require("express");
const router = express.Router();
const { protected_route } = require("../middlewares/auth_middleware");

//
const {
  createNewBlog,
  getAllBlogs,
} = require("../controllers/blog_controller");
//
router.post("/post-blog", protected_route, createNewBlog);
router.get("/get-blogs", getAllBlogs);

//
module.exports = router;

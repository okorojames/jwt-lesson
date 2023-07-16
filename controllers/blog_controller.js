const blogSchema = require("../models/blog_model");

// create new blog
const createNewBlog = async (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(400).json({ msg: "please fill in all details" });
  }
  try {
    const blog = new blogSchema({ title, body, user: req.james.id });
    console.log("From controller", req.james);
    await blog.save();
    return res.status(201).json(blog);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};
//
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogSchema.find().sort({ createdAt: -1 });
    return res.status(200).json(blogs);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};
//
module.exports = { createNewBlog, getAllBlogs };

const Blog = require("../models/blog")
const mongoose = require("mongoose")

const all_blogs = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then(blogs => {
      res.json({ code: 0, rebsult })
    })
    .catch(err => {
      res.json({ code: 1, Message: "Could not retrive blogs" })
    })
}

const find_blog = (req, res) => {
  Blog.findById(req.params.id)
    .then(blog => {
      res.json({ code: 0, blog })
    })
    .catch(err => {
      res.json({ code: 1, Message: "Blog was not found" })
    })
}

const delete_blog = (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ code: 1, Message: "An invalid Id was provided" })
  }

  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ code: 0, Message: "The blog was deleted successfully" })
    })
    .catch(err => {
      res.json({ code: 1, Message: "Blog was not found" })
    })
}

const add_blog = (req, res) => {
  const blog = new Blog(req.body)

  blog
    .save()
    .then(result => {
      res.json({ code: 0, Message: "Blog was added successfully" })
    })
    .catch(err => {
      res.json({ code: 1, Message: "Blog was not added" })
    })
}

const edit_blog = (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ code: 0, Message: "Blog was updated successfully" })
    })
    .catch(err => {
      res.json({ code: 1, Message: "Blog was not found" })
    })
}

module.exports = {
  all_blogs,
  find_blog,
  delete_blog,
  add_blog,
  edit_blog,
}

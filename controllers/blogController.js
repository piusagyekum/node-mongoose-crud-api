const Blog = require("../models/blog")

const all_blogs = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then(result => {
      res.json({ code: 0, result })
    })
    .catch(err => {
      res.json({ Message: "could not retrive blogs" })
    })
}

const find_blog = (req, res) => {
  Blog.findById(req.params.id)
    .then(result => {
      res.json({ code: 0, result })
    })
    .catch(err => {
      res.json({ Message: "Blog was not found" })
    })
}

const delete_blog = (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
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
      res.json({ code: 0, result })
    })
    .catch(err => {
      res.json({ code: 1, Message: "Blog was not added", err })
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

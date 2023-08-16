const express = require("express")
const mongoose = require("mongoose")
const morgan = require('morgan')
const {
  all_blogs,
  find_blog,
  delete_blog,
  add_blog,
  edit_blog,
} = require("./controllers/blogController")

const app = express()
app.use(morgan('dev'))
app.use(express.json())

const dbURI =
  "mongodb+srv://thetruekobby:Password1@cluster0.osni8bu.mongodb.net/blogs?retryWrites=true&w=majority"

mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(3000, "127.0.0.1", () => {
      console.log("listening for requests on port 3000")
    })
  })
  .catch(err => {
    console.log("could not connect to the database")
  })

app.get("/blogs", all_blogs)

app.get("/blogs/:id", find_blog)

app.delete("/blogs/:id", delete_blog)

app.post("/blogs/add", add_blog)

app.patch("/blogs/:id", edit_blog)

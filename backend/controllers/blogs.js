const Blog = require("../models/blog")
const { tokenExtractor, userExtractor } = require("../utils/middleware")
const blogsRouter = require("express").Router()
require("express-async-errors")

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {username: 1, name: 1})
  response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const token = tokenExtractor(request)
  const user = await userExtractor(token)
  const body = request.body

  const blog = new Blog({
    title: body.title,
    content: body.content,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", async (request, response) => {
  const token = tokenExtractor(request)
  const user = await userExtractor(token)
  const blogToBeDeleted = await Blog.findById(request.params.id)

  if (user.id !== blogToBeDeleted.user.toString())
    return response.status(401).json({error: "you are not authorized to delete this blog"})

  await Blog.findByIdAndDelete(blogToBeDeleted.id)

  const index = user.blogs.findIndex(blog => blog.id === blogToBeDeleted.id)
  if (index > -1)
    user.blogs.splice(index, 1)
  await user.save()

  response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
  const token = tokenExtractor(request)
  const user = await userExtractor(token)

  const newBlog = {...request.body}
  const userId = newBlog.user
  newBlog.user = newBlog.user.id
  const blogId = request.params.id

  await Blog.findByIdAndUpdate(blogId, newBlog, {new: true})
  user.blogs[user.blogs.findIndex(blog => blog.id === blogId)] = {...newBlog}
  await user.save()

  newBlog.user = userId
  response.status(200).json(newBlog)
})

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.status(200).json(blog)
})

blogsRouter.get("/:id/comments", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.status(200).json(blog.comments)
})

blogsRouter.post("/:id/comments", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  blog.comments.push(request.body.text)
  await blog.save()
  response.status(200).json(blog)
})

module.exports = blogsRouter
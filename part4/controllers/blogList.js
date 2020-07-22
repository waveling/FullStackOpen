const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
});

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body;

  const user = await User.findById(body.userId);

  const blog = new Blog({
    likes: body.likes,
    author: body.author,
    url: body.url,
    title: body.title,
    user: user._id
  });

  try {
    const newBlog = await blog.save();
    user.blogs = user.blogs.concat(newBlog._id)
    await user.save();
    response.json(newBlog);
  } catch (error) {
    next(error);
  }  
});

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    likes: body.likes
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end();
});

module.exports = blogsRouter;
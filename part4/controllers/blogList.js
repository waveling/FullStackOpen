const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

//Helper function for token authorization
const getTokenFrom = request => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
});


blogsRouter.post('/', async (request, response, next) => {
  const body = request.body;
  const token = getTokenFrom(request);

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    };

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      likes: body.likes || 0,
      author: body.author,
      url: body.url,
      title: body.title,
      user: user._id
    });

    
      const newBlog = await blog.save();
      user.blogs = user.blogs.concat(newBlog._id)
      await user.save();
      response.json(newBlog);
  } catch (exception) {
    next(exception);
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
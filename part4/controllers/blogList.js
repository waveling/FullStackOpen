const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
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
  const token = request.token;

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

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const blog = {
    likes: body.likes
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
});

blogsRouter.delete('/:id', async (request, response, next) => {

  try {

    console.log('this is before')
    const requestId = request.params.id;
    const token = request.token;
    
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log('decoded:', decodedToken)
    
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    
    console.log('decoded id', decodedToken.id, '');
    
    //after all this i should search for the blog with the same id as the request has?
    //if the blog.user is the same as decodedToken.id then remove the blog corresponding to request id

    const blog = await Blog.find({});
    console.log('this is blog:', blog[3].user)

    await Blog.findByIdAndRemove(decodedToken.id);
    response.status(204).end();
  } catch (exception) {
    next(exception)
  }
});

module.exports = blogsRouter;
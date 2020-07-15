const listHelper = require('../utils/list_helper');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

const initialBlogs = [ 
  { 
    _id: "5a422a851b54a676234d17f7", 
    title: "React patterns", 
    author: "Michael Chan", 
    url: "https://reactpatterns.com/", 
    likes: 7, 
    __v: 0 
  }, 
  { 
    _id: "5a422aa71b54a676234d17f8", 
    title: "Go To Statement Considered Harmful", 
    author: "Edsger W. Dijkstra", 
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
    likes: 5, 
    __v: 0 
  },
  { 
    _id: "5a422b3a1b54a676234d17f9", 
    title: "Canonical string reduction", 
    author: "Edsger W. Dijkstra", 
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
    likes: 12, 
    __v: 0 
  },
  { 
    _id: "5a422b891b54a676234d17fa", 
    title: "First class tests", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
    likes: 10, 
    __v: 0 
  },
  { 
    _id: "5a422ba71b54a676234d17fb", 
    title: "TDD harms architecture", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
    likes: 0, 
    __v: 0 
  },
  { 
    _id: "5a422bc61b54a676234d17fc", 
    title: "Type wars", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
    likes: 2, 
    __v: 0 
  }
]

//Cleans the database before each test, and makes sure the db is the same before each test.
beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

//Tests that blogs are returned as json
test('blogs are returned as json', async () => {
  await api
  .get('/api/blogs')
  .expect(200)
  .expect('Content-Type', /application\/json/)
});

//Makes sure the length of the bloglist is correct
test('length of bloglist', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2);
});

//Tests that the the id of the returned mongoose object is correctly formatted (id instead of _id(default))
test('verify id formatting', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined();
});

//Tests the blog containing a specific author is included in the bloglist
test('specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.author)

  expect(contents).toContain('Michael Chan')
})

//Makes sure the post request functions as predicted, and a correctly formatted blog can be added
test('a valid blog can be added to the list', async () => {
  const newBlog = {
    title: "Test Blog", 
    author: "John Doe", 
    url: "https://somerandomurl.com/", 
    likes: 10, 
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const author = response.body.map(r => r.author)

  expect(response.body).toHaveLength(3)
  expect(author).toContain('John Doe')

})

//Test that returns 1 (one) regardless of input
describe('dummyTest', () => {
  test('dummy returns one', () => {
    
    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});

//Calculates the total likes of all the blogs in the list
describe('totalLikes', () => {
  test('total likes combined', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36);
  });
});

describe('favoriteBlog', () => {
  test('search for the blog with most likes', () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[2]);
  });
});

describe('mostBlogs', () => {
  test('search for author with most blogs', () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({ author: 'Robert C. Martin', blogs: 3 });
  });
});

describe('mostLikes', () => {
  test('author with most likes', () => {
    expect(listHelper.mostLikes(blogs)).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })
})

afterAll(() => {
  mongoose.connection.close();
});
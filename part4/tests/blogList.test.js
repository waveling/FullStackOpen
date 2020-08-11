const listHelper = require('../utils/list_helper');
const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);
let token = null;

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

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'Superuser', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await listHelper.usersInDb()

    const newUser = {
      username: 'waveling',
      name: 'Joonas Aaltonen',
      password: 'salasana',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await listHelper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await listHelper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salasana',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await listHelper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

})

//Cleans the database before each test, and makes sure the db is the same before each test.
beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('salasana', 10)
  const user = new User({
    username: 'root',
    name: 'Superuser',
    passwordHash,
  })

  const savedUser = await user.save()
  const userForToken = {
    username: savedUser.username,
    id: savedUser._id,
  }

  token = jwt.sign(userForToken, process.env.SECRET)

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
});

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
});

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
    .set('Authorization', `bearer ${token}` )
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const author = response.body.map(r => r.author)

  expect(response.body).toHaveLength(3)
  expect(author).toContain('John Doe')

});

//Requests with improper tokens fail with status code 401
test('request with false token fails with proper status code', async () => {
  const newBlog = {
    title: "Test Blog", 
    author: "John Doe", 
    url: "https://somerandomurl.com/", 
    likes: 10, 
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer falsetoken`)
    .send(newBlog)
    .expect(401)
})

//Test that if no "likes"-value is given, it defaults to 0
test('likes-value defaults to one', async () => {
  //likes-value is missing:
  const newBlog = {
    title: "Test Blog",
    author: "John Doe",
    url: "https://somerandomurl.com/"
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
  
  const response = await api.get('/api/blogs')

  //Checks the previously added newBlog for likes-value:
  console.log('response:',response.body)
  const likes = response.body[2].likes;

  expect(likes).toBe(0)
});


//If title and url-properties are missing, returns 400
test('validate title and url-properties', async () => {
  const newBlog = {
    author: 'John Doe',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(400)
});

//Test that returns 1 (one) regardless of input
describe('dummyTest', () => {
  test('dummy returns one', () => {
    
    const result = listHelper.dummy(initialBlogs);
    expect(result).toBe(1);
  });
});

//Calculates the total likes of all the blogs in the list
describe('totalLikes', () => {
  test('total likes combined', () => {
    expect(listHelper.totalLikes(initialBlogs)).toBe(36);
  });
});

describe('favoriteBlog', () => {
  test('search for the blog with most likes', () => {
    expect(listHelper.favoriteBlog(initialBlogs)).toEqual(initialBlogs[2]);
  });
});

describe('mostBlogs', () => {
  test('search for author with most blogs', () => {
    expect(listHelper.mostBlogs(initialBlogs)).toEqual({ author: 'Robert C. Martin', blogs: 3 });
  });
});

describe('mostLikes', () => {
  test('author with most likes', () => {
    expect(listHelper.mostLikes(initialBlogs)).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  });
});

afterAll(() => {
  mongoose.connection.close();
});
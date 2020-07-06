const _ = require('lodash');

const blogs = [ 
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

//returns 1 regardless of the input
const dummy = (blogs) => {
  return 1;
};

//sums the likes of all the provided blogs and returns the total amount
const totalLikes = (blogs) => {
  return blogs.reduce((result, item) => result + item.likes, 0);
};

//searched for the blog with the most likes, and returns that blog's information
const favoriteBlog = (blogs) => {
  return blogs.reduce((acc, cv) => {
    return cv.likes > acc.likes ? cv : acc;
  })
};

//searches for the author with most blogs. Returns the author and the amount of blogs.
const mostBlogs = (blogs) => {
  const groupedList = _.groupBy(blogs, function(blogs) {
    return blogs.author; 
  });

  const reduced = _.reduce(groupedList, function(sum, n) {
    
    return sum.length > n.length ? sum : n;
  }, {});

  return { author: reduced[0].author, blogs: reduced.length };
}

//searches for the author with most likes. Returns the author and the amount of likes.
const mostLikes = (blogs) => {
  const groupedList = _.groupBy(blogs, function(blogs) {
    return blogs.author;
  });

  const groupedListKeys = Object.keys(groupedList);

  //Groups all authors with the amount of likes their blogs have gotten
  const mapped = groupedListKeys.map((key) => {
    const grouped = groupedList[key].reduce((sum, n) => {
      return sum + n.likes;
    }, 0);
    return {author: key, likes: grouped};
  });

  //Pick the author with most likes
  const result = mapped.reduce((sum, n) => {
    return sum.likes > n.likes ? sum : n;
  });

  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};

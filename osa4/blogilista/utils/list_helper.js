const totalLikes = (blogs) => {
  const reducer = (sum, item) => sum + item.likes
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }

  const reducer = (previous, current) => {
    if (previous.likes > current.likes) {
      return previous
    } else {
      return current
    }
  }
  const result = blogs.reduce(reducer)

  const returnBlog = {
    title: result.title,
    author: result.author,
    likes: result.likes
  }

  return returnBlog
}

module.exports = {
  totalLikes,
  favoriteBlog
}
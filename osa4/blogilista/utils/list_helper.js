const totalLikes = (blogs) => {
  const likes = blogs.map(x => x.likes)
  if (likes.length === 0) {
    return 0
  }  else {
    const totalLikes = likes.reduce((sum, like) => {
      return sum + like
    })
    return totalLikes
  }
}

module.exports = {
  totalLikes
}
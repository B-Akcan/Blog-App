const compareBlogCount = (a, b) => {
  if (a.blogs.length < b.blogs.length) return 1
  else if (a.blogs.length > b.blogs.length) return -1
  return 0
}

export default compareBlogCount
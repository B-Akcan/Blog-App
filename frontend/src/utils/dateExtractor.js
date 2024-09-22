const dateExtractor = (date) => {
  return new Date(date).toUTCString().substring(0, 16)
}

export default dateExtractor
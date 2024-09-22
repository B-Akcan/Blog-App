import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Paper } from "@mui/material"
import dateExtractor from "../utils/dateExtractor"

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)

  if (blogs.length !== 0)
  {
    return (
      <Paper elevation={10} style={{ padding: 10 }}>
        {blogs.map(blog => (
          <Paper key={blog.id} elevation={5} style={{ margin: 10, padding: 10 }}>
            <Link to={`/blogs/${blog.id}`} className="contentLink">{blog.title}</Link>
            <br/>
            by {blog.user.name}
            <br/>
            on {dateExtractor(blog.creationDate)}
          </Paper>
        ))}
      </Paper>
    )
  }
}

export default Blogs

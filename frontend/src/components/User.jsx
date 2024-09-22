import { Link } from "react-router-dom"
import { Paper } from "@mui/material"
import compareLikes from "../utils/compareLikes"

const User = ({ user }) => {
  if (!user)
    return <Paper elevation={10} style={{ padding: 10 }}>There isn't any user with this id!</Paper>

  user.blogs = user.blogs.sort(compareLikes)

  return (
    <Paper elevation={10} style={{ padding: 10 }}>
      <h2 style={{ textAlign: "center" }}>{user.name}'s blogs</h2>
      { user.blogs.length !== 0 ? (
        user.blogs.map(blog => (
          <Paper key={blog.id} elevation={5} style={{ margin: 10, padding: 10 }}>
            <Link to={`/blogs/${blog.id}`} className="contentLink">{blog.title}</Link>
            <br/>
            {blog.likes} likes
          </Paper>
        ))
      ) : (<p style={{ marginLeft: 10 }}>This user does not have any blog.</p>) }
    </Paper>
  )
}

export default User
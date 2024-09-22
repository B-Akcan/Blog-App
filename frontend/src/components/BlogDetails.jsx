import { Paper, Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { updateBlog } from "../reducers/blogReducer"
import { setNotificationAndClearWithTimeout } from "../reducers/notificationReducer"
import dateExtractor from "../utils/dateExtractor"

const BlogDetails = ({ blog, setDialogOpen }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLike = (blog) => {
    const newBlog = { ...blog }
    newBlog.likes++

    dispatch(updateBlog(newBlog))
    dispatch(setNotificationAndClearWithTimeout(`Blog "${newBlog.title}" was liked`, "success", 5))
  }

  return (
    <Paper elevation={5} style={{ marginBottom: 30, paddingLeft: 15, paddingRight: 15, paddingTop: 10, paddingBottom: 15 }}>
      <div style={{ marginBottom: 5 }}>
        <span data-testid="likes" style={{ marginRight: 10, marginBottom: 10 }}>{blog.likes} likes</span>
        <Button onClick={() => handleLike(blog)} variant="contained">Like</Button>
      </div>
      <div style={{ marginBottom: 5 }}>
        created by <Link to={`/users/${blog.user.id}`} className="contentLink">{blog.user.name}</Link>
        <br/>
        on {dateExtractor(blog.creationDate)}
      </div>
      {user.username === blog.user.username ? (
        <Button onClick={() => setDialogOpen(true)} variant="contained">delete blog</Button>
      ) : ""}
    </Paper>
  )
}

export default BlogDetails
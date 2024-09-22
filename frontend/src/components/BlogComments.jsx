import { Paper, TextField, Button, List, ListItem } from "@mui/material"
import { useDispatch } from "react-redux"
import { setNotificationAndClearWithTimeout } from "../reducers/notificationReducer"
import { updateBlog } from "../reducers/blogReducer"
import { useState } from "react"

const BlogComments = ({ blog }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState("")

  const handleAddComment = (event) => {
    event.preventDefault()

    if (comment === "")
    {
      dispatch(setNotificationAndClearWithTimeout("Please enter a proper comment!", "error", 5))
      return
    }

    const commentedBlog = {
      ...blog,
      comments: blog.comments.concat(comment)
    }

    dispatch(updateBlog(commentedBlog))
    dispatch(setNotificationAndClearWithTimeout(`Added a comment to blog "${commentedBlog.title}"`, "success", 5))

    setComment("")
  }

  return (
    <Paper elevation={5} style={{ marginBottom: 30, paddingLeft: 15, paddingRight: 15, paddingTop: 1, paddingBottom: 15 }}>
      <h3>Comments</h3>
      <form onSubmit={handleAddComment}>
        <TextField value={comment} onChange={({ target }) => setComment(target.value)} style={{ marginRight: 10 }} />
        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>add a comment</Button>
      </form>
      {blog.comments.length !== 0 ?
        <List>
          {blog.comments.map(comment => (
            <ListItem key={comment}>{comment}</ListItem>
          ))}
        </List> :
        <p>This blog does not have any comment.</p>}
    </Paper>
  )
}

export default BlogComments
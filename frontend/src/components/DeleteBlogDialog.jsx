import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material"
import { useDispatch } from "react-redux"
import { setNotificationAndClearWithTimeout } from "../reducers/notificationReducer"
import { deleteBlog } from "../reducers/blogReducer"
import { useNavigate } from "react-router-dom"

const DeleteBlogDialog = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDeleteBlog = (blog) => {
    dispatch(deleteBlog(blog.id))
    dispatch(setNotificationAndClearWithTimeout(`Blog "${blog.title}" was deleted`, "success", 5))
    navigate("/")
    window.location.reload()
  }

  return (
    <Dialog open={props.dialogOpen}>
      <DialogTitle>Are you sure you want to delete blog "{props.blog.title}"?</DialogTitle>
      <DialogActions>
        <Button onClick={() => handleDeleteBlog(props.blog)} variant="contained">yes</Button>
        <Button onClick={() => props.setDialogOpen(false)}>no</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteBlogDialog
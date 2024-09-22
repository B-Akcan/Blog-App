import { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { newBlog } from "../reducers/blogReducer"
import { setNotificationAndClearWithTimeout } from "../reducers/notificationReducer"
import Togglable from "./Togglable"
import { TextField, Button, Paper } from "@mui/material"


const NewBlog = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const dispatch = useDispatch()
  const togglableRef = useRef()
  const user = useSelector(state => state.user)

  const createNewBlog = (event) => {
    const blog = {
      title,
      content
    }

    togglableRef.current.toggleVisibility()

    dispatch(newBlog(blog))
    dispatch(setNotificationAndClearWithTimeout(`A new blog "${blog.title}" by "${user.name}" was added`, "success", 5))

    setTitle("")
    setContent("")
  }

  return (
    <Paper elevation={10} style={{ padding: 15, paddingTop: 1, marginBottom: 15 }}>
      <Togglable buttonText="Create a blog" ref={togglableRef}>
        <h2>Create a blog</h2>
        <form onSubmit={createNewBlog}>
          <div style={{ paddingBottom: 10 }}>
            <TextField
              data-testid="title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              style={{ width: "100%" }}
              id="titleInput"
              label="Title"/>
          </div>
          <div style={{ paddingBottom: 10 }}>
            <TextField
              value={content}
              onChange={({ target }) => setContent(target.value)}
              style={{ width: "100%" }}
              label="Content"
              id="outlined-multiline-static"
              multiline
              rows={4}/>
          </div>
          <Button type="submit" variant="contained">Create</Button>
        </form>
      </Togglable>
    </Paper>
  )
}

export default NewBlog

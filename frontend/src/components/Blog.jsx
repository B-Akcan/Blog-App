import { useState } from "react"
import { Paper } from "@mui/material"
import DeleteBlogDialog from "./DeleteBlogDialog"
import BlogComments from "./BlogComments"
import BlogDetails from "./BlogDetails"
import BlogContent from "./BlogContent"

const Blog = ({ blog }) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  if (!blog)
    return <p>This blog does not exist!</p>

  return (
    <Paper elevation={10} style={{ paddingTop: 5, paddingLeft: 25, paddingRight: 25, paddingBottom: 5 }}>
      <h2 style={{ textAlign: "center" }}>{blog.title}</h2>
      <BlogContent blog={blog} />
      <BlogDetails blog={blog} setDialogOpen={setDialogOpen} />
      <BlogComments blog={blog} />
      <DeleteBlogDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} blog={blog} />
    </Paper>
  )
}

export default Blog

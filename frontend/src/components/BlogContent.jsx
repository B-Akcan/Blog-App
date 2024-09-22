import { Paper } from "@mui/material"

const BlogContent = ({ blog }) => {
  return (
    <Paper elevation={5} style={{ marginBottom: 30, paddingLeft: 15, paddingRight: 15, paddingTop: 10, paddingBottom: 15 }}>
      <div style={{ marginBottom: 5 }}>
        <p>{blog.content}</p>
      </div>
    </Paper>
  )
}

export default BlogContent
import { Alert } from "@mui/material"
import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification.text !== "")
  {
    return (
      <div style={{ textAlign: "center", marginBottom: 15 }}>
        <Alert severity={notification.type}>{notification.text}</Alert>
      </div>
    )
  }
}

export default Notification

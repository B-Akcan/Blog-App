import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return { text: "", type: "success" }
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const setNotificationAndClearWithTimeout = (notification, type, seconds) => {
  return async dispatch => {
    dispatch(setNotification({ notification, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
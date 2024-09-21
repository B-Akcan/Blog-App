import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: { text: "", type: "success" },
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

export const setNotificationAndClearWithTimeout = (text, type, seconds) => {
  return async dispatch => {
    const notification = { text, type }
    dispatch(setNotification(notification))

    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
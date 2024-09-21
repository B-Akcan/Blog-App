import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return { text: action.payload.text, type: action.payload.type }
    },
    clearNotification(state, action) {
      return { text: "", type: "success" }
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const setNotificationAndClearWithTimeout = (text, type, seconds) => {
  return async dispatch => {
    dispatch(setNotification(text, type))
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
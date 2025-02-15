import { createSlice } from "@reduxjs/toolkit";
import type { Notification } from "@/core/types";

export type NotificationsState = {
  notifications: Notification[];
};

export const initialState: NotificationsState = {
  notifications: [],
};

const notificationsSlice = createSlice({
  name: "Notifications",
  initialState,
  reducers: {
    updateNotifications: (state, action) => {
      state.notifications = action.payload;
    },
  },
});

export const notificationsReducer = notificationsSlice.reducer;

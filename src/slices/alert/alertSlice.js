import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
  name: 'alert',
  initialState: { open: null, message: null, severity: null },
  reducers: {
    openAlert: (state, action) => {
      const { message, severity } = action.payload;
      state.open = true;
      state.message = message;
      state.severity = severity;
    },
    closeAlert: (state, action) => {
      state.open = false;
      state.message = null;
      state.severity = null;
    },
  },
});

export const { openAlert, closeAlert } = alertSlice.actions;

export default alertSlice.reducer;

export const selectCurrentAlertOpen = (state) => state.alert.open;
export const selectCurrentMessage = (state) => state.alert.message;
export const selectCurrentSeverity = (state) => state.alert.severity;

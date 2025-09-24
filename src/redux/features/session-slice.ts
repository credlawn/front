import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface SessionData {
  isLoggedin: boolean;
  user?: {
    email: string;
    full_name: string;
    mobile: string;
  };
  sid?: string;
  uid?: string;
}

const initialState: SessionData = {
  isLoggedin: false,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<SessionData>) => {
      state.isLoggedin = action.payload.isLoggedin;
      state.user = action.payload.user;
      state.sid = action.payload.sid;
      state.uid = action.payload.uid;
    },
    clearSession: (state) => {
      state.isLoggedin = false;
      state.user = undefined;
      state.sid = undefined;
      state.uid = undefined;
    },
  },
});

export const { setSession, clearSession } = sessionSlice.actions;

export const selectSession = (state: RootState) => state.session;

export default sessionSlice.reducer;

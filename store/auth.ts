import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { authMode: "signUp" | "login"} = {
  authMode: "signUp"
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthMode: (state, action: PayloadAction<"signUp" | "login">) => {
      state.authMode = action.payload
    }
  }
});

export const authActions = { ...authSlice.actions };
export default authSlice;

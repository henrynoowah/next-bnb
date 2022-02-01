import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerBuildingState } from "../types/reduxState";

const initialState: registerBuildingState = {
  largeBuildingType: null,
  buildingType: null,
  roomType: null,
  isSetUpForGuest: null
}

const registerRoomSlice = createSlice({
  name: "registerRoom",
  initialState,
  reducers : {
    setLargeBuildingType: (state, action: PayloadAction<string>) => {
      state.largeBuildingType = action.payload
      return state
    }
  }
})

export const registerRoomActions = { ...registerRoomSlice.actions }
export default registerRoomSlice;
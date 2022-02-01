import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  largeBuildingType: null,
  buildingType: null,
  roomType: null,
  isSetUpForGuest: null
}

const registerRoomSlice = createSlice({
  name: "registerRoom",
  initialState,
  reducers : {

  }
})

export const registerRoomActions = { ...registerRoomSlice.actions }
export default registerRoomSlice;
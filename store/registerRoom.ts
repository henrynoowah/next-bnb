import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RegisterRoomState } from "../types/reduxState";
import { BedType } from "../types/room";

const initialState: RegisterRoomState = {
  largeBuildingType: null,
  buildingType: null,
  roomType: null,
  isSetUpForGuest: null,
  maxiumumGuestCount: 1,
  bedroomCount: 0,
  bedCount: 0,
  bedList: []
}

const registerRoomSlice = createSlice({
  name: "registerRoom",
  initialState,
  reducers : {
    setLargeBuildingType: (state, action: PayloadAction<string>) => {
      state.largeBuildingType = action.payload;
      return state;
    },
    setBuildingType: (state, action: PayloadAction<string>) => {
      state.buildingType = action.payload;
      return state;
    },
    setRoomType: (state, action: PayloadAction<string>) => {
      state.roomType = action.payload;
      return state;
    },
    setIsUpForGuest: (state, action: PayloadAction<boolean>) => {
      state.isSetUpForGuest = action.payload;
      return state;
    },
    setMaximumGuestCount: (state, action: PayloadAction<number>) => {
      state.maxiumumGuestCount = action.payload;
      return state;
    },
    setBedRoomCount: (state, action: PayloadAction<number>) => {
      const bedroomCount = action.payload;
      let { bedList } = state;
      state.bedroomCount = bedroomCount;

      if(bedroomCount < bedList.length) {
        bedList = state.bedList?.slice(0, bedroomCount);
      } else {
        for(let i = bedList?.length + 1; i < bedroomCount + 1; i++) {
          bedList.push({id: i, beds: []})
        }
      }
      state.bedList = bedList;
      return state
    },
    setBedCount: (state, action: PayloadAction<number>) => {
      state.bedCount = action.payload;
      return state
    },
    setBedTypeCount: (state, action: PayloadAction<{ bedroomId: number; type: BedType; count: number}>) => {
      const { bedroomId, type, count } = action.payload;
      const bedroom = state.bedList[bedroomId - 1];
      const prevBeds = bedroom.beds;
      const index = prevBeds.findIndex(bed => bed.type === type);

      if (index === -1) {
        // 타입이 존재하지 않을 때
        state.bedList[bedroomId - 1].beds =[...prevBeds, { type, count }];
        return state
      }
      // 타입이 존재할 때
      if (count === 0) {
        state.bedList[bedroomId - 1].beds.splice(index, 1);
      } else {
        state.bedList[bedroomId - 1].beds[index].count = count;
      }
      return state
    }
    
  }
})

export const registerRoomActions = { ...registerRoomSlice.actions }
export default registerRoomSlice;
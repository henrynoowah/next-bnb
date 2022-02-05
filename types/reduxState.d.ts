import { UserType } from "./user"; 

export type UserState = UserType & {
  isLogged: boolean
};

export type CommonState = {
  validateMode: boolean;
};

export type RegisterRoomState = registerBuildingState & {
  maxiumumGuestCount: number;
  bedroomCount: number;
  bedCount: number;
  bedList: { id: number; beds: { type: BedType; count: number}[] }[]
}

export type registerBuildingState = {
  largeBuildingType: string | null;
  buildingType: string | null,
  roomType: string | null,
  isSetUpForGuest: boolean | null,
}
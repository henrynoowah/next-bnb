import { UserType } from "./user"; 

export type UserState = UserType & {
  isLogged: boolean;
};

export type CommonState = {
  validateMode: boolean;
};

export type RegisterRoomState = {
  largeBuildingType: string | null;
  buildingType: string | null;
  roomType: string | null;
  isSetUpForGuest: boolean | null;
  maxiumumGuestCount: number;
  bedroomCount: number;
  bedCount: number;
  bedList: { id: number; beds: { type: BedType; count: number}[] }[];
  publicBedList: { type: BedType; count: number}[];
  bathroomCount: number;
  bathroomType: "private" | "public" | null;
}
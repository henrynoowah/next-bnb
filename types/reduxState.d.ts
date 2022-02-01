import { UserType } from "./user"; 

export type UserState = UserType & {
  isLogged: boolean
};

export type CommonState = {
  validateMode: boolean;
};


export type registerBuildingState = {
  largeBuildingType: string | null;
  buildingType: string | null,
  roomType: string | null,
  isSetUpForGuest: string | null,

}
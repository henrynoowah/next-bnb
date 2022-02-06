import { FC } from "react";
import { useSelector } from "../../../store";
import RegisterRoomBedTypes from "./RegisterRoomBedTypes";
import RegisterRoomPublicBedTypes from "./RegisterRoomPublicBedTypes";

const RegisterRoomBedList: FC = () => {
  const bedList = useSelector((state) => state.registerRoom.bedList);

  return (
    <>
      {bedList.map((bedroom) => (
        <RegisterRoomBedTypes bedroom={bedroom} />
      ))}
      <RegisterRoomPublicBedTypes />
    </>
  );
};

export default RegisterRoomBedList;

import { ChangeEvent, FC } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { bedRoomCountList } from "../../../lib/staticData";
import { getNumber } from "../../../lib/utils";
import { useSelector } from "../../../store";
import { registerRoomActions } from "../../../store/registerRoom";
import palette from "../../../styles/palette";
import Button from "../../common/Button";
import Counter from "../../common/Counter";
import Selector from "../../common/Selector";
import RegisterRoomBedTypes from "./RegisterRoomBedTypes";
import RegisterRoomFooter from "./RegisterRoomFooter";

const Container = styled.div`
  padding: 62px 30px 100px;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }
  h3 {
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }
  .register-room-step-info {
    font-size: 14px;
    max-width: 400px;
    margin-bottom: 24px;
    max-width: 400px;
    word-break: keep-all;
  }
  .register-room-max-guest-count {
    width: 320px;
    margin-top: 24px;
    margin-bottom: 32px;
  }

  .register-room-bedroom-count-wrapper {
    width: 320px;
    margin-bottom: 32px;
  }
  .register-room-bed-type-info {
    margin-top: 6px;
    margin-bottom: 20px;
    max-width: 400px;
    word-break: keep-all;
  }
  .register-room-bed-type-list-wrapper {
    width: 548px;
  }
`;

const RegisterRoomBedRooms: FC = () => {
  const maximumGuestCount = useSelector(
    (store) => store.registerRoom.maxiumumGuestCount
  );
  const dispatch = useDispatch();

  const bedRoomCount = useSelector((store) => store.registerRoom.bedroomCount);
  const bedCount = useSelector((store) => store.registerRoom.bedCount);
  const bedList = useSelector((store) => store.registerRoom.bedList);

  const onChangeMaximumGuestCount = (value: number) => {
    dispatch(registerRoomActions.setMaximumGuestCount(value));
  };
  const onChangeBedRoomCount = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      registerRoomActions.setBedRoomCount(getNumber(e.target.value) || 0)
    );
  };
  const onChangeBedCount = (value: number) => {
    dispatch(registerRoomActions.setBedCount(value));
  };
  return (
    <Container>
      <h2>숙소에 얼마나 많은 인원이 숙박할 수 있나요?</h2>
      <h3>2단계</h3>
      <p className="register-room-step-info">
        모든 게스트가 편안하게 숙박할 수 있도록 침대가 충분히 구비되어있는지
        확인하세요.
      </p>
      <div className="register-room-max-guest-count">
        <Counter
          label="최대 숙박인원"
          value={maximumGuestCount}
          onChange={onChangeMaximumGuestCount}
        />
      </div>
      <div className="register-room-bedroom-count-wrapper">
        <Selector
          type="register"
          label="게스트가 사용할 수 있는 침실은 몇 개인가요?"
          value={`침실 ${bedRoomCount}개`}
          options={bedRoomCountList}
          onChange={onChangeBedRoomCount}
          disabled={maximumGuestCount === 0}
        />
      </div>
      <div className="register-room-bedroom-count-wrapper">
        <Counter label="침대" value={bedCount} onChange={onChangeBedCount} />
      </div>
      <RegisterRoomFooter
        isValid={true}
        prevHref="/room/register/building"
        nextHref="/room/register/bedroom"
      />
      <h4>침대 유형</h4>
      <p className="register-room-bed-type-info ">
        각 침실에 놓인 침대유형을 명시하면 숙소에 침대가 어떻게 구비되어 있는지
        게스트가 잘 파악할 수 있습니다.
      </p>
      <div className="register-room-bed-type-list-wrapper">
        {bedList.map((bedroom) => (
          <RegisterRoomBedTypes bedroom={bedroom} />
        ))}
      </div>
    </Container>
  );
};

export default RegisterRoomBedRooms;

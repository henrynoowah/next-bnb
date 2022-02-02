import { FC } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useSelector } from "../../store";
import { registerRoomActions } from "../../store/registerRoom";
import palette from "../../styles/palette";
import Counter from "../common/Counter";
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
`;

const RegisterRoomBedRooms: FC = () => {
  const maximumGuestCount = useSelector(
    (store) => store.registerRoom.maxiumumGuestCount
  );
  const dispatch = useDispatch();

  const onChangeMaximumGuestCount = (value: number) => {
    dispatch(registerRoomActions.setMaximumGuestCount(value));
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
      <RegisterRoomFooter
        isValid={true}
        prevHref="/"
        nextHref="/room/register/bedroom"
      />
    </Container>
  );
};

export default RegisterRoomBedRooms;

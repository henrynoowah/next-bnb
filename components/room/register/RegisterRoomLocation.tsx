import { ChangeEvent, FC } from "react";
import styled from "styled-components";
import palette from "styles/palette";
import Button from "components/common/Button";
import NavigationIcon from "../../../public/static/svg/register/navigation.svg";
import Selector from "components/common/Selector";
import { countryList } from "lib/staticData";
import Input from "components/common/Input";
import { useSelector } from "store";
import { useDispatch } from "react-redux";
import { registerRoomActions } from "store/registerRoom";

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
  }
  .register-room-location-button-wrapper {
    width: 176px;
    margin-bottom: 24px;
  }
  .register-room-location-selector-wrapper {
    width: 358px;
    margin-bottom: 24px;
  }
  .register-room-location-city-district {
    max-width: 385px;
    display: flex;
    margin-bottom: 24px;
    > div:first-child {
      margin-right: 24px;
    }
  }
  .register-room-location-street-address {
    max-width: 385px;
    margin-bottom: 24px;
  }
  .register-room-location-detail-address {
    max-width: 385px;
    margin-bottom: 24px;
  }
  .register-room-location-postcode {
    max-width: 385px;
  }
`;

const RegisterRoomLocation: FC = () => {
  const country = useSelector((store) => store.registerRoom.country);
  const city = useSelector((store) => store.registerRoom.city);
  const district = useSelector((store) => store.registerRoom.district);
  const streetAddress = useSelector(
    (store) => store.registerRoom.streetAddress
  );
  const detailAddress = useSelector(
    (store) => store.registerRoom.detailAddress
  );
  const postcode = useSelector((store) => store.registerRoom.postcode);

  const dispatch = useDispatch();

  const onChangeCountry = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setCountry(e.target.value));
  };
  const onChangeCity = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setCity(e.target.value));
  };
  const onChangeDistrict = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setDistrict(e.target.value));
  };
  const onChangeStreetAddress = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setStreetAddress(e.target.value));
  };
  const onChangeDetailAddress = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setDetailAddress(e.target.value));
  };
  const onChangePostCode = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setPostCode(e.target.value));
  };
  return (
    <Container>
      <h2>????????? ????????? ???????????????</h2>
      <h3>4??????</h3>
      <p className="register-room-step-info">
        ????????? ?????? ????????? ???????????? ????????? ????????? ????????? ???????????????
      </p>
      <div className="register-room-location-button-wrapper">
        <Button color="dark_cyan" colorReverse={true} icon={<NavigationIcon />}>
          ?????? ?????? ??????
        </Button>
      </div>
      <div className="register-room-location-selector-wrapper">
        <Selector
          type="register"
          options={countryList}
          useValidation={false}
          defaultValue="??????/?????? ??????"
          disabledOptions={["??????/?????? ??????"]}
          value={country}
          onChange={onChangeCountry}
        />
      </div>
      <div className="register-room-location-city-district">
        <Input label="???/???" value={city} onChange={onChangeCity} />
        <Input label="???/???/???" value={district} onChange={onChangeDistrict} />
      </div>
      <div className="register-room-location-street-address">
        <Input
          label="????????? ??????"
          value={streetAddress}
          onChange={onChangeStreetAddress}
        />
      </div>
      <div className="register-room-location-detail-address">
        <Input
          label="????????? (?????? ??????)"
          useValidation={false}
          value={detailAddress}
          onChange={onChangeDetailAddress}
        />
      </div>
      <div className="register-room-location-postcode">
        <Input label="????????????" value={postcode} onChange={onChangePostCode} />
      </div>
    </Container>
  );
};

export default RegisterRoomLocation;

import { FC, useMemo, useState } from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import { BedType } from "../../types/room";
import Button from "../common/Button";
import Selector from "../common/Selector";

const Container = styled.li`
  list-style: none;
  width: 100%;
  padding: 28px 0;
  border-top: 1px solid ${palette.gray_dd};
  &:last-child {
    border-bottom: 1px solid ${palette.gray_dd};
  }
  .register-room-bed-type-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .register-room-bed-type-texts {
    margin-bottom: 28px;
  }
  .register-room-bed-type-bedroom {
    font-size: 19px;
    color: ${palette.gray_48};
  }
  .register-room-bed-type-selector-wrapper {
    margin-top: 28px;
    width: 320px;
  }
  .register-room-bed-type-bedroom-counts {
    font-size: 19px;
    color: ${palette.gray_76};
    max-width: 240px;
    word-break: keep-all;
  }
`;

interface IProps {
  bedroom: { id: number; beds: { type: BedType; count: number }[] };
}
const RegisterRoomBedTypes: FC<IProps> = ({ bedroom }) => {
  const [opened, setOpened] = useState(false);

  const toggleOpened = () => setOpened(!opened);

  const totalBedCounts = useMemo(() => {
    let total = 0;
    bedroom.beds.forEach((bed) => {
      total += bed.count;
    });
    return total;
  }, [bedroom]);

  return (
    <Container>
      <div className="register-room-bed-type-top">
        <div>
          <p className="register-room-bed-type-bedroom">{bedroom.id}번 침실</p>
          <p className="register-room-bed-type-bedroom-counts">
            침대 0개
            <br />
          </p>
        </div>
        <Button onClick={toggleOpened} styleType="register" color="white">
          {opened && "완료"}
          {!opened &&
            (totalBedCounts === 0 ? "침대 추가하기" : "침대 수정하기")}
        </Button>
      </div>

      {opened && (
        <div className="register-room-bed-type-selector-wrapper">
          <Selector
            type="register"
            defaultValue="다른침대 추가"
            value="다른침대 추가"
            disabledOptions={["다른침대 추가"]}
          />
        </div>
      )}
    </Container>
  );
};

export default RegisterRoomBedTypes;

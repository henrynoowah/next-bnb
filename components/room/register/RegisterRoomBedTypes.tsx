import { FC, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { bedTypes } from "../../../lib/staticData";
import { registerRoomActions } from "../../../store/registerRoom";
import palette from "../../../styles/palette";
import { BedType } from "../../../types/room";
import Button from "../../common/Button";
import Counter from "../../common/Counter";
import Selector from "../../common/Selector";

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
  .register-room-bed-type-counters {
    width: 320px;
    margin-top: 28px;
  }
  .register-room-bed-type-counter {
    width: 290px;
    margin-bottom: 18px;
  }
`;

interface IProps {
  bedroom: { id: number; beds: { type: BedType; count: number }[] };
}
const RegisterRoomBedTypes: FC<IProps> = ({ bedroom }) => {
  const dispatch = useDispatch();

  const initialBedOptiopns = bedroom.beds.map((bed) => bed.type);
  const [activeBedOptions, setActiveBedOptions] =
    useState<BedType[]>(initialBedOptiopns);

  const bedsText = useMemo(() => {
    const texts = bedroom.beds.map((bed) => `${bed.type} ${bed.count}`);
    return texts.join(", ");
  }, [bedroom]);

  const lastBedOptions = useMemo(() => {
    return bedTypes.filter((bedType) => !activeBedOptions.includes(bedType));
  }, [activeBedOptions, bedroom]);

  const [opened, setOpened] = useState(false);

  const toggleOpened = () => setOpened(!opened);

  const totalBedCounts = useMemo(() => {
    let total = 0;
    bedroom.beds.forEach((bed) => {
      total += bed.count;
    });
    return total;
  }, [bedroom]);

  const onChangeTypeCount = (value: number, type: BedType) => {
    dispatch(
      registerRoomActions.setBedTypeCount({
        bedroomId: bedroom.id,
        type,
        count: value,
      })
    );
  };

  return (
    <Container>
      <div className="register-room-bed-type-top">
        <div>
          <p className="register-room-bed-type-bedroom">{bedroom.id}번 침실</p>
          <p className="register-room-bed-type-bedroom-counts">
            침대 {totalBedCounts}개
            <br />
            {bedsText}
          </p>
        </div>
        <Button onClick={toggleOpened} color="white" width="161px">
          {opened && "완료"}
          {!opened &&
            (totalBedCounts === 0 ? "침대 추가하기" : "침대 수정하기")}
        </Button>
      </div>

      {opened && (
        <div className="register-room-bed-type-counters">
          {activeBedOptions.map((type) => (
            <div className="register-room-bed-type-counter" key={type}>
              <Counter
                label={type}
                value={
                  bedroom.beds.find((bed) => bed.type === type)?.count || 0
                }
                key={type}
                onChange={(value) => onChangeTypeCount(value, type)}
              />
            </div>
          ))}
        </div>
      )}

      {opened && (
        <div className="register-room-bed-type-selector-wrapper">
          <Selector
            options={lastBedOptions}
            type="register"
            defaultValue="다른침대 추가"
            value="다른침대 추가"
            disabledOptions={["다른침대 추가"]}
            onChange={(e) =>
              setActiveBedOptions([
                ...activeBedOptions,
                e.target.value as BedType,
              ])
            }
          />
        </div>
      )}
    </Container>
  );
};

export default RegisterRoomBedTypes;

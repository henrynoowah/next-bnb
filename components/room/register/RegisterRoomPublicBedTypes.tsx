import { FC, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { bedTypes } from "../../../lib/staticData";
import { useSelector } from "../../../store";
import { registerRoomActions } from "../../../store/registerRoom";
import palette from "../../../styles/palette";
import { BedType } from "../../../types/room";
import Button from "../../common/Button";
import Counter from "../../common/Counter";
import Selector from "../../common/Selector";

const Container = styled.li`
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
  .register-room-bed-type-bedroom {
    font-size: 19px;
    color: ${palette.gray_48};
  }
  .register-room-public-bed-type-counters {
    width: 320px;
    margin-top: 28px;
  }
  .register-room-bed-type-bedroom-counts {
    font-size: 19px;
    color: ${palette.gray_76};
  }
  .register-room-bed-type-counter {
    width: 290px;
    margin-bottom: 18px;
  }
`;

const RegisterRoomPublicBedTypes: FC = () => {
  const dispatch = useDispatch();

  const [opened, setOpened] = useState(false);
  const publicBedList = useSelector(
    (store) => store.registerRoom.publicBedList
  );

  const totalBedCount = useMemo(() => {
    let total = 0;
    publicBedList.forEach((bed) => {
      total += bed.count;
    });
    return total;
  }, [publicBedList]);

  const bedsText = useMemo(() => {
    const texts = publicBedList.map((bed) => `${bed.type} ${bed.count}개`);
    return texts;
  }, [publicBedList]);

  const initialBedOptions = () => publicBedList.map((bed) => bed.type);

  const [activeBedOptions, setActiveBedOptions] =
    useState<BedType[]>(initialBedOptions);

  const lastBedOptions = useMemo(() => {
    return bedTypes.filter((bedType) => !activeBedOptions.includes(bedType));
  }, [activeBedOptions, publicBedList]);

  return (
    <Container>
      <div className="register-room-bed-type-top">
        <div>
          <p className="register-room-bed-type-bedroom">공용공간</p>
          <p className="register-room-bed-type-bedroom-counts">
            침대 0개 <br />
            {bedsText}
          </p>
        </div>
        <Button onClick={() => setOpened(!opened)} color="white" width="161px">
          {opened && "완료"}
          {!opened && (totalBedCount === 0 ? "침대추가하기" : "침대수정하기")}
        </Button>
      </div>
      {opened && (
        <div className="register-room-public-bed-type-counters">
          {activeBedOptions.map((type) => (
            <div className="register-room-bed-type-counter" key={type}>
              <Counter
                label={type}
                value={
                  publicBedList.find((bed) => bed.type === type)?.count || 0
                }
                key={type}
                onChange={(value) => {
                  dispatch(
                    registerRoomActions.setPublicBedTypeCount({
                      type,
                      count: value,
                    })
                  );
                }}
              />
            </div>
          ))}
          <Selector
            type="register"
            options={lastBedOptions}
            disabledOptions={["다른침대 추가"]}
            value="다른침대추가"
            onChange={(e) => {
              setActiveBedOptions([
                ...activeBedOptions,
                e.target.value as BedType,
              ]);
            }}
            useValidation={false}
          />
        </div>
      )}
    </Container>
  );
};

export default RegisterRoomPublicBedTypes;

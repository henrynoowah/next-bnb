import { FC, MouseEvent, useEffect } from "react";
import BackArrowIcon from "../../public/static/svg/registerregister_room_footer_back_arrow.svg";
import Button from "../../common/Button";
import palette from "../../../styles/palette";
import useValidateMode from "../../../hooks/useValidateMode";
import styled from "styled-components";
import Link from "next/link";

const Container = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 548px;
  height: 82px;
  padding: 14px 30px 20px;
  background-color: white;
  z-index: 10;
  border-top: 1px solid ${palette.gray_dd};

  .register-room-footer-back {
    display: flex;
    align-items: center;
    color: ${palette.dark_cyan};
    cursor: pointer;
    svg {
      margin-right: 8px;
    }
  }
`;

interface IProps {
  prevHref?: string;
  nextHref?: string;
  isValid?: boolean;
}
const RegisterRoomFooter: FC<IProps> = ({
  prevHref,
  nextHref,
  isValid = false,
}) => {
  const onClickNext = (e: MouseEvent<HTMLButtonElement | MouseEvent>) => {
    if (!isValid) {
      e.preventDefault();
      setValidateMode(true);
    }
  };

  const { setValidateMode } = useValidateMode();

  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, []);

  return (
    <Container>
      <Link href={prevHref || ""}>
        <a className="register-room-footer-back">뒤로</a>
      </Link>
      <Link href={nextHref || ""}>
        <a>
          <Button color={"dark_cyan"} onClick={onClickNext}>
            계속
          </Button>
        </a>
      </Link>
    </Container>
  );
};

export default RegisterRoomFooter;

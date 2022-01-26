import { FC, useState, ChangeEvent } from "react";
import styled from "styled-components";
import CloseXIcon from "../../public/static/svg/modal/modal_colose_x_icon.svg";
import MailIcon from "../../public/static/svg/auth/mail.svg";
import PersonIcon from "../../public/static/svg/auth/person.svg";
import OpenedEyeIcon from "../../public/static/svg/auth/opened_eye.svg";
import ClosedEyeIcon from "../../public/static/svg/auth/closed_eye.svg";
import palette from "../../styles/palette";
import Input from "../common/input";

const Container = styled.form`
  width: 568px;
  height: 614px;
  padding: 32px;
  background-color: white;
  z-index: 11;

  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }

  .input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }

  .sign-up-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }
`;

const SignUpModal: FC = () => {
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangeLastName = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };
  const onChangeFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const togglePassword = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <Container>
      <CloseXIcon className="modal-close-x-icon" />
      <div className="input-wrapper">
        <Input
          placeholder="이메일주소"
          type="email"
          name="email"
          icon={<MailIcon />}
          value={email}
          onChange={onChangeEmail}
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="이름(예:길동)"
          name="email"
          icon={<PersonIcon />}
          value={lastName}
          onChange={onChangeLastName}
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="성(예:홍)"
          icon={<PersonIcon />}
          value={firstName}
          onChange={onChangeFirstName}
        />
      </div>
      <div className="input-wrapper sign-up-password-input-wrapper">
        <Input
          placeholder="비밀번호"
          type={hidePassword ? "password" : "text"}
          icon={
            hidePassword ? (
              <OpenedEyeIcon onClick={togglePassword} />
            ) : (
              <ClosedEyeIcon onClick={togglePassword} />
            )
          }
          value={password}
          onChange={onChangePassword}
        />
      </div>
    </Container>
  );
};

export default SignUpModal;

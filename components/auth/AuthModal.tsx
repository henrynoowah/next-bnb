import { FC } from "react";
import { useSelector } from "../../store";
import SignUpModal from "./SignUpModal";
import styled from "styled-components";
import LoginModal from "./LoginModal";

interface IProps {
  closeModal: VoidFunction;
}

const Container = styled.div`
  z-index: 11;
`;

const AuthModal: FC<IProps> = ({ closeModal }) => {
  const authMode = useSelector((store) => store.auth.authMode);
  return (
    <Container>
      {authMode === "signUp" && <SignUpModal closeModal={closeModal} />}
      {authMode === "login" && <LoginModal closeModal={closeModal} />}
    </Container>
  );
};

export default AuthModal;

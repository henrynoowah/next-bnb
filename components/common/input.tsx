import { FC, InputHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import palette from "../../styles/palette";
import { useSelector } from "../../store";

type InputContainerProps = {
  iconExist: boolean;
  isValid: boolean;
  useValidation: boolean;
};

const Container = styled.div<InputContainerProps>`
  input {
    position: relative;
    width: 100%;
    height: 46px;
    padding: ${({ iconExist }) => (iconExist ? "0 44px 0 11px " : "0 11px")};
    border: 1px solid ${palette.gray_eb};
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    & ::placeholder {
      color: ${palette.gray_76};
    }
    & :focus {
      border-color: ${palette.dark_cyan};
    }
  }
  .input-err-message {
    margin-top: 8px;
    font-weight: 600;
    font-size: 14px;
    color: ${palette.tawny};
  }
  ${({ useValidation, isValid }) =>
    useValidation &&
    !isValid &&
    css`
      input {
        background-color: ${palette.snow};
        border-color: ${palette.orange};
        &:focus {
          border-color: ${palette.orange};
        }
      }
    `}
  ${({ useValidation, isValid }) =>
    useValidation &&
    isValid &&
    css`
      input {
        background-color: ${palette.dark_cyan};
      }
    `}
  .input-icon-wrapper {
    position: absolute;
    top: 0;
    right: 11px;
    height: 46px;
    display: flex;
    align-items: center;
  }
`;

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element;
  isValid?: boolean;
  useValidation?: boolean;
  errMessage?: string;
}

const Input: FC<IProps> = ({
  icon,
  isValid = false,
  useValidation = true,
  errMessage,
  ...props
}) => {
  const validateMode = useSelector((store) => store.common.validateMode);

  return (
    <Container
      iconExist={!!icon}
      isValid={isValid}
      useValidation={validateMode && useValidation}
    >
      <input {...props} />
      <div className="input-icon-wrapper">{icon}</div>
      {useValidation && validateMode && !isValid && errMessage && (
        <p className="input-err-message">{errMessage}</p>
      )}
    </Container>
  );
};

export default Input;

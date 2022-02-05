import { FC, ReactNode, ButtonHTMLAttributes, memo } from "react";
import styled, { css } from "styled-components";
import palette from "../../styles/palette";

const Container = styled.button<{ styleType: "normal" | "register" }>`
  ${({ styleType }) =>
    styleType === "normal" ? NormalButtonStyle : RegisterButtonStyle}
  ${(props) => getButtonColor(props.color || "")}
`;

const NormalButtonStyle = css`
  width: 100%;
  height: 48px;
  padding: 0 15px;
  border: 0;
  border-radius: 4px;
  background-color: ${palette.bittersweet};
  color: white;
  font-size: 16px;
  font-weight: 800;
  outline: none;
  cursor: pointer;
`;

const RegisterButtonStyle = css`
  width: 161px;
  height: 48px;
  border: 1px solid ${palette.gray_c4};
  background-color: white;
  border-radius: 4px;
  color: ${palette.gray_48};
  font-size: 18px;
  font-weight: 700;
  outline: none;
  cursor: pointer;
`;

const getButtonColor = (color: string) => {
  switch (color) {
    case "dark_cyan":
      return css`
        background-color: ${palette.dark_cyan};
      `;
    case "white":
      return css`
        background-color: white;
      `;
    default:
      return css`
        background-color: ${palette.bittersweet};
      `;
  }
};

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: "dark_cyan" | any;
  styleType: "normal" | "register";
}

const Button: FC<IProps> = ({
  children,
  color,
  styleType = "normal",
  ...props
}) => {
  return (
    <Container color={color} {...props} styleType={styleType}>
      {children}
    </Container>
  );
};

export default memo(Button);

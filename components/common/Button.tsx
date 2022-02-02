import { FC, ReactNode, ButtonHTMLAttributes, memo } from "react";
import styled, { css } from "styled-components";
import palette from "../../styles/palette";

const Container = styled.button`
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
  ${(props) => getButtonColor(props.color || "")}
`;

const getButtonColor = (color: string) => {
  switch (color) {
    case "dark_cyan":
      return css`
        background-color: ${palette.dark_cyan};
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
}

const Button: FC<IProps> = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

export default memo(Button);

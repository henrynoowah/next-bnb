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
  // if (colorReverse) {
  //   switch (color) {
  //     case "dark_cyan":
  //       return css`
  //         border: 2px solid ${palette.dark_cyan};
  //         color: ${palette.dark_cyan};
  //         background-color: white;
  //       `;
  //     default:
  //       return css`
  //         border: 2px solid ${palette.black};
  //         color: ${palette.black};
  //         background-color: white;
  //       `;
  //   }
  // }
  switch (color) {
    case "dark_cyan":
      return css`
        background-color: ${palette.dark_cyan};
        color: white;
      `;
    case "bittersweet":
      return css`
        background-color: ${palette.bittersweet};
        color: white;
      `;
    case "amaranth":
      return css`
        background-color: ${palette.amaranth};
        color: white;
      `;
    default:
      return css`
        background-color: white;
        color: ${palette.black};
        border: 1px solid ${palette.gray_c4};
      `;
  }
};

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: "dark_cyan" | "white" | "bittersweet" | "amaranth";
}

const Button: FC<IProps> = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

export default memo(Button);

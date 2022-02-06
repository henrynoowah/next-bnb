import { FC, SelectHTMLAttributes, memo } from "react";
import styled, { css } from "styled-components";
import { useSelector } from "../../store";
import palette from "../../styles/palette";

const normalSelectorStyle = css`
  width: 100%;
  height: 46px;
  select {
    width: 100%;
    height: 100%;
    background-color: white;
    border: 1px solid ${palette.gray_eb};
    padding: 0 11px;
    border-radius: 4px;
    outline: none;
    -webkit-appearance: none;
    background-image: url("/static/svg/common/selector/selector_down_arrow.svg");
    background-position: right 11px center;
    background-repeat: no-repeat;
    font-size: 16px;
    &:focus {
      border-color: ${palette.dark_cyan};
    }
  }
`;

const registerSelectorStyle = css`
  width: 100%;
  label {
    position: relative;
  }
  span {
    display: block;
    font-size: 16px;
    color: ${palette.gray_76};
    font-weight: 600;
    margin-bottom: 8px;
  }
  select {
    width: 100%;
    height: 56px;
    border-radius: 8px;
    border: 1px solid ${palette.gray_b0};
    padding: 0 14px 0 12px;
    appearance: none;
    outline: none;
    -webkit-appearance: none;
    background-image: url("/static/svg/common/selector/register_selector_down_arrow.svg");
    background-position: right 14px center;
    background-repeat: no-repeat;
  }
`;

interface SelectorContainerProps {
  isValid: boolean;
  validateMode: boolean;
  type: "register" | "normal";
}

const Container = styled.div<SelectorContainerProps>`
  ${({ type }) => type === "normal" && normalSelectorStyle}
  ${({ type }) => type === "register" && registerSelectorStyle}

  select {
    ${({ isValid, validateMode }) => {
      if (validateMode) {
        if (!isValid) {
          return css`
            border-color: ${palette.tawny};
            background-color: ${palette.snow};
          `;
        }
        return css`
          border-color: ${palette.dark_cyan};
        `;
      }
      return undefined;
    }}
    &:disabled {
      background-image: url("/static/svg/common/selector/disabled_register_selector_down_arrow.svg");
    }
    .selector-warning {
      margin-top: 80px;
      display: flex;
      align-items: center;
      svg {
        margin-right: 4px;
      }
      p {
        font-size: 12px;
        color: ${palette.davidson_orange};
      }
    }
  }
`;

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: string[];
  value?: string;
  disabledOptions?: string[];
  errMessage?: string;
  isValid?: boolean;
  useValidation?: boolean;
  type?: "register" | "normal";
}

const Selector: FC<IProps> = ({
  label,
  options = [],
  disabledOptions = [],
  errMessage,
  isValid,
  type = "normal",
  useValidation = true,
  ...props
}) => {
  const validateMode = useSelector((store) => store.common.validateMode);

  return (
    <Container isValid={!!isValid} validateMode={validateMode} type={type}>
      <label>
        {label && <span>{label}</span>}
        <select {...props}>
          {disabledOptions.map((option, index) => (
            <option key={index} value={option} disabled>
              {option}
            </option>
          ))}
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      {validateMode && !isValid && (
        <div>
          <p>{errMessage}</p>
        </div>
      )}
    </Container>
  );
};

export default memo(Selector);

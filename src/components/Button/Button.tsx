import React from "react";
import styled, { css } from "styled-components";
import { ChildrenType } from "types/types";

interface ButtonInterface {
  children?: ChildrenType;
  type?: "submit" | "button";
  icon?: string;
  onClick?: (e: React.MouseEvent) => void;
  variant?: ButtonVariantType
}

type ButtonVariantType = "primary" | "secondary" | "danger" | "text";

const IconStyled = styled.img`
  line-height: 1;
  max-width: 100%;
  opacity: 0.65;
`;

const ButtonStyled = styled.button<ButtonInterface>`
  font-size: ${({ theme }) => theme.sizes.s};
  font-weight: ${({ theme }) => theme.weights.medium};
  font-family:inherit;
  padding: ${({ icon }) => (icon ? "0" : "1.2rem .5rem")};
  border-radius: 3px;
  cursor: pointer;
  text-decoration: none;
  background-color: ${({ theme }) => theme.colors.light};
  border: ${({ theme }) => `1px solid ${theme.colors.light}`};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  ${({ variant }) => {
      switch(variant) {
        case "text":
          return css`
            background-color: transparent;
            border: 0;
          `; 
        case "danger":
          return css`
            background-color: ${({ theme }) => theme.colors.danger};
          `; 
      }
  }};

  ${({ icon }) =>
    icon &&
    css`
      background: transparent;
      border: 0;
      width: 18px;
      height: 18px;
    `}
`;

const Button = ({
  children,
  type = "button",
  icon,
  variant,
  onClick,
}: ButtonInterface) => {
  return (
    <ButtonStyled type={type} onClick={onClick} icon={icon} variant={variant}>
      {icon ? <IconStyled src={icon} alt="" /> : children}
    </ButtonStyled>
  );
};

export default Button;

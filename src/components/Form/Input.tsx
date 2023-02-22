import React from "react";
import styled, { css } from "styled-components";

type InputType = {
  label?: string;
  type?:  "text" | "number" | "email" | "tel" | "search";
  required: boolean;
  name: string;
  defaultValue?: string | number;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const LabelStyled = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.sizes.s};
  text-transform: capitalize;
`;

const InputStyled = styled.input<InputType>`
  border: 2px solid ${({ theme }) => theme.colors.light};
  outline: 0;
  border-radius: 0.7rem;
  display: block;
  width: 100%;
  min-height: 5rem;
  transition: border-color 0.25s ease 0s;
  font-size: ${({ theme }) => theme.sizes.s};
  margin-top: .5rem;
  padding: 0 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.weights.medium};
  font-family: inherit;

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: hsl(232, 6%, 95%);
    `}
`;

const LabelContainerStyled = styled.label`
  display: block;
  &:not(:first-child) {
    margin-top: 1.5rem;
  }
`;

const Input = ({
  defaultValue,
  label,
  type = "text",
  required,
  name,
  disabled,
  placeholder,
  onChange,
}: InputType) => (
  <LabelContainerStyled>
    {label ? <LabelStyled>{label}:</LabelStyled> : null}
    <InputStyled
      required={required}
      name={name}
      type={type}
      defaultValue={defaultValue}
      disabled={disabled}
      placeholder={placeholder}
      onChange={onChange}
    />
  </LabelContainerStyled>
);
export default Input;

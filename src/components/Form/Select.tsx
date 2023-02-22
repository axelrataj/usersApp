import React from "react";
import styled, { css } from "styled-components";
import { SortType, PositionType, LevelType, GenderType } from "types/types";

type SelectType = {
  label?: string;
  name: string;
  options: { value: string; label: string }[];
  defaultValue?: SortType | PositionType | LevelType | GenderType | null;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
};

const LabelStyled = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.sizes.s};
  text-transform: capitalize;
`;

const SelectStyled = styled.select`
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
  background-color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.weights.medium};
  font-family: inherit;
  opacity: 1;

  ${({ disabled }) => disabled && css`
    background-color: hsl(232, 6%, 95%);
  ` } 
`;

const LabelContainerStyled = styled.label`
  display: block;
  &:not(:first-child) {
    margin-top: 1.5rem;
  }
`;

const Select = ({
  label,
  name,
  options,
  defaultValue,
  onChange,
  disabled,
  required,
  placeholder,
}: SelectType) => (
  <LabelContainerStyled>
    {label ? <LabelStyled>{label}:</LabelStyled> : null}
    <SelectStyled
      onChange={onChange}
      defaultValue={defaultValue as PositionType}
      disabled={disabled}
      required={required}
      name={name}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </SelectStyled>
  </LabelContainerStyled>
);
export default Select;

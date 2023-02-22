import React from "react";
import styled from "styled-components";

interface FormInterface {
  onSubmit?: (e: React.FormEvent) => void;
  children: React.ReactNode;
}

const FormStyled = styled.form``;

const Form = ({ children, onSubmit }: FormInterface) => {
  return (
    <FormStyled onSubmit={onSubmit} autoComplete="off">
      {children}
    </FormStyled>
  );
};

export default Form;

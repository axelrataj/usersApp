import React from "react";
import styled from "styled-components";

const HeadingStyled = styled.h1`
  font-size: ${({ theme }) => theme.sizes.xl};
  font-weight: ${({ theme }) => theme.weights.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

const HeaderStyled = styled.header`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 0;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0 15px -5px rgba(66, 68, 90, 0.5);
`;

const Header = () => (
  <>
    <HeaderStyled>
      <HeadingStyled>
        Users
      </HeadingStyled>
    </HeaderStyled>
  </>
);

export default Header;

import React from "react";
import styled, { css } from "styled-components";
import { ChildrenType } from "types/types";

const NavWrapperHeight = 60;

interface SurfaceInterface {
  children: ChildrenType;
  type?: string;
}

const SurfaceContentStyled = styled.div<SurfaceInterface>`
  width: calc(100% - (2 * ${({ theme }) => theme.grid.padding}));
  margin: 0 auto;
  height: calc(100vh - 70px);
  display: grid;
  grid-template-rows: calc(100% - ${NavWrapperHeight + 25}px) ${NavWrapperHeight}px;
  gap: 25px;
  animation: appear 0.35s ease 0s;

  @keyframes appear {
    0% {
      opacity: 0;
      transform: translateY(25px);
    }

    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  ${({ type }) =>
    type === "full" &&
    css`
      height: calc(100vh - 95px);
      grid-template-rows: 1fr;
    `}
`;

const SurfaceStyled = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0 15px -5px rgba(66, 68, 90, 0.5);
  padding: 2.5rem;
  border-radius: 1rem;
  margin-top: 2.5rem;
  overflow: auto;
`;

const Surface = ({ type, children }: SurfaceInterface) => {
  return (
    <>
      <SurfaceContentStyled type={type}>
        <SurfaceStyled>{children}</SurfaceStyled>
      </SurfaceContentStyled>
    </>
  );
};

export default Surface;

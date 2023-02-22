import Button from "components/Button/Button";
import React from "react";
import styled, { css } from "styled-components";
import iconEdit from "assets/images/icon-pencil.svg";

interface AvatarInterface {
  content: string;
}
interface CardInterface {
  position: string;
  name: string;
  onClick?: (e: React.MouseEvent) => void;
}

const ButtonStyled = styled.span``;

const CardActionsStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  justify-self: flex-end;
`;

const CardContentStyled = styled.div``;

const CardHeadingStyled = styled.div`
  text-transform: capitalize;
`;

const CardTextStyled = styled.p`
  margin-top: 0.3rem;
  text-transform: capitalize;
`;

const randomizeColor: () => string = () => {
  return `hsl(${Math.floor(Math.random() * 400)}, ${Math.floor(
    Math.random() * 100
  )}%, 80%)`;
};

const AvatarStyled = styled.div.attrs(() => ({
  style: {
    backgroundColor: `${randomizeColor()}`,
  },
}))<AvatarInterface>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ content }) =>
    content &&
    css`
      &:before {
        content: "${content}";
        font-size: ${({ theme }) => theme.sizes.l};
        font-weight: ${({ theme }) => theme.weights.bold};
        color: ${({ theme }) => theme.colors.white};
        text-transform: uppercase;
      }
    `}
`;

const CardStyled = styled.div`
  font-size: ${({ theme }) => theme.sizes.s};
  font-weight: ${({ theme }) => theme.weights.light};
  padding: 1.2rem .5rem;
  display: grid;
  grid-template-columns: 50px 1fr auto;
  align-items: center;
  gap: 1.5rem;
  cursor: pointer;
`;

const Card = ({ position, name, onClick }: CardInterface) => {
  const setPosition: (position: string) => string = (position) =>
    position.replace("_", " ");

  return (
    <CardStyled onClick={onClick}>
      <AvatarStyled content={name.slice(0, 1)} />
      <CardContentStyled>
        <CardHeadingStyled>{name}</CardHeadingStyled>
        <CardTextStyled>{setPosition(position)}</CardTextStyled>
      </CardContentStyled>
      <CardActionsStyled>
        <ButtonStyled as={Button} icon={iconEdit}>
          edit
        </ButtonStyled>
      </CardActionsStyled>
    </CardStyled>
  );
};

export default Card;

import React from "react";
import { setMessage } from "store/features/users/usersSlice";
import { useAppDispatch } from "store/hooks/hooks";
import styled, { css } from "styled-components";
import { MessageInterface, MessageType } from "types/types";

interface MessageTypeInterface {
  type: MessageType;
}

const MessageStyled = styled.div<MessageTypeInterface>`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  min-height: 70px;
  background-color: hsla(136, 58%, 75%, 1);
  box-shadow: 0px 0 15px -5px rgba(66, 68, 90, 0.5);
  padding: 2.5rem;
  border-radius: 1rem;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  animation: appear 0.25s ease-in 0s;

  @keyframes appear {
    0% {
      opacity: 0;
      transform: translateY(-2.5rem);
    }

    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  ${({ type }) => {
    switch (type) {
      case "info":
        return css`
          background-color: hsla(136, 58%, 75%, 1);
        `;
      case "error":
        return css`
          background-color: hsla(136, 58%, 75%, 1);
        `;
    }
  }}
`;

const MessageContentStyled = styled.div`
  font-size: ${({ theme }) => theme.sizes.m};
  font-weight: ${({ theme }) => theme.weights.bold};
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;

const Message = ({ type, content }: MessageInterface) => {
  const dispatch = useAppDispatch();
  const destroyMessage: () => void = () => {
    setTimeout(() => {
      dispatch(setMessage({ type: null, content: "" }));
    }, 5000);
  };

  destroyMessage();

  return (
    <>
      <MessageStyled type={type}>
        <MessageContentStyled>{content}</MessageContentStyled>
      </MessageStyled>
    </>
  );
};

export default Message;

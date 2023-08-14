import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { BiErrorAlt, BiCheckCircle } from "react-icons/bi";
import { RiCloseFill, RiTranslate } from "react-icons/ri";
import { useDispatch } from "react-redux";

import styled, { css, keyframes } from "styled-components";
import { removeNotify } from "./notificationsSlice";

const appearence = keyframes`
from{
  transform: translateX(0);
}
  to{
    transform: translateX(-200%);
  }
`;

const showing = keyframes`
to{
  transform: translateX(0);
}
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: var(--bg-secondary);
  border-radius: 5px;
  padding: 1rem;
  overflow: auto;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.4);
  transform: translateX(-200%);
  animation: ${({ $closing }) => ($closing ? appearence : showing)} 400ms
    forwards;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 6px;
    width: ${({ $width }) => `calc(100% - ${$width}%)`};
    background-color: ${({ $type }) =>
      $type === "error" ? "var(--clr-error)" : "var(--clr-success)"};
  }

  & > svg {
    font-size: 2.2rem;
    color: ${({ $type }) =>
      $type === "error" ? "var(--clr-error)" : "var(--clr-success)"};
  }

  @media (max-width: 481px) {
    max-width: 300px;
  }
`;
const Text = styled.span`
  font-size: 1.1rem;
  color: var(--primary);
  margin-left: 0.75rem;
  word-break: break-all;
`;
const CloseBtn = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  cursor: pointer;

  svg {
    font-size: 1.75rem;
  }
`;

export const NotifyItem = ({ id, type, message }) => {
  const dispatch = useDispatch();
  const [width, setWidth] = useState(0);
  const [closing, setClosing] = useState(false);
  const timerId = useRef(null);

  useEffect(() => {
    handleStartTimer();

    return () => timerId.current && clearInterval(timerId.current);
  }, []);

  const handleStartTimer = () => {
    timerId.current = setInterval(() => {
      setWidth((prevState) => {
        if (prevState < 100) {
          return prevState + 1;
        }
        return prevState;
      });
    }, 20);
  };

  const handleCloseNotify = () => {
    setClosing(true);
    timerId.current && clearInterval(timerId.current);

    setTimeout(() => {
      dispatch(removeNotify(id));
    }, 400);
  };

  const handleStopTimer = () => {
    timerId.current && clearInterval(timerId.current);
  };

  useEffect(() => {
    if (width === 100) {
      handleCloseNotify();
    }
  }, [width]);

  return (
    <Wrapper
      $type={type}
      onMouseEnter={handleStopTimer}
      onMouseLeave={handleStartTimer}
      $closing={closing}
      $showing={showing}
      $width={width}
    >
      <BiErrorAlt />
      <Text>{message}</Text>
      <CloseBtn onClick={handleCloseNotify}>
        <RiCloseFill />
      </CloseBtn>
    </Wrapper>
  );
};

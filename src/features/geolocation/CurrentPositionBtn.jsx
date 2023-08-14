import styled from "styled-components";
import { BsGeoAlt } from "react-icons/bs";
import { addNotify } from "../notifications/notificationsSlice";
import { useDispatch } from "react-redux";
import { getGeolocationCoords } from "./geolocationSlice";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  color: #ecf3e9;
  margin: 0 1rem;
  cursor: pointer;
  background-color: var(--bg-primary);
  padding: 0.4rem 1rem;
  border-radius: 10px;
  transition: 0.3s;
  cursor: ${({ $disabled }) => ($disabled ? "no-drop" : "pointer")};

  &:hover {
    background-color: var(--hover-clr);
  }

  svg {
    font-size: 1.5rem;
    color: var(--primary);
  }

  @media (max-width: 1024px) {
    padding: 0;
    justify-content: center;
    min-width: 2.5rem;
    min-height: 2.5rem;
    max-width: 2.5rem;
    max-height: 2.5rem;
    border-radius: 50%;
  }

  @media (max-width: 481px) {
    margin: 0 0.5rem;
    min-width: 2.25rem;
    min-height: 2.25rem;
    max-width: 2.25rem;
    max-height: 2.25rem;
  }
`;
const Text = styled.span`
  margin-left: 0.25rem;
  font-size: 1.1rem;
  color: var(--primary);

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const CurrentPositionBtn = () => {
  const dispatch = useDispatch();

  const timeoutId = useRef();
  const [disabled, setDisabled] = useState(false);

  const handleClick = async () => {
    setDisabled(true);

    if (!disabled) {
      dispatch(getGeolocationCoords())
        .unwrap()
        .catch((err) => {
          dispatch(addNotify({ message: err.message, type: "error" }));
        });
    }
  };

  useEffect(() => {
    if (disabled) {
      timeoutId.current = setTimeout(() => {
        setDisabled(false);
      }, 2000);
    }

    return () => clearTimeout(timeoutId.current);
  }, [disabled]);

  return (
    <Wrapper $disabled={disabled} onClick={handleClick}>
      <BsGeoAlt />
      <Text>Current</Text>
    </Wrapper>
  );
};

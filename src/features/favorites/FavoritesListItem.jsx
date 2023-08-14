import styled, { css, keyframes } from "styled-components";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromFavorites,
  selectFavorites,
  toggleFavorites,
} from "./favoritesSlice";
import { formatDate } from "../../utls/formatDate";
import { selectAllMeasures } from "../measures/measuresSlice";
import { getTempStr } from "../../utls/getTempStr";
import { loadWeatherById } from "../weather/weatherSlice";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

const show = keyframes`
  from {
    transform: translate(-20px, -20px);
    opacity: 0;

  }

  to {
    transform: translate(0);
    opacity: 1;
  }
`;

const hide = keyframes`
  from {
    transform: translate(0);
    opacity: 1;

  }

  to {
    transform: translateY(-100px);
    opacity: 0;
  }
`;

const Wrapper = styled.li`
  position: relative;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--bg-primary);
  border-radius: 10px;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: var(--hover-shadow-clr);
  }

  ${({ $isOpen, $index, $closing }) => {
    if ($isOpen && $closing) {
      return css`
        opacity: 1;
        animation: ${hide} 400ms forwards;
      `;
    } else if ($isOpen) {
      return css`
        opacity: 0;
        animation: ${show} 400ms ${$index * 200}ms forwards;
      `;
    } else {
      return css`
        opacity: 1;
      `;
    }
  }}

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;
const Time = styled.span`
  margin-bottom: 0.5rem;
  color: var(--secondary);
  font-size: 0.9rem;
`;
const City = styled.p`
  font-size: 1.1rem;
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-bottom: 1rem;
`;
const WeatherData = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  svg {
    font-size: 2rem;
  }
`;
const Temp = styled.span`
  font-size: 1.5rem;
  margin-left: 1rem;
`;
const RemoveFromFavoritesBtn = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const FavoritesListItem = (props) => {
  const { index, id, city, dt, timezone, temp } = props;
  const dispatch = useDispatch();

  const removeBtnRef = useRef();
  const timeRef = useRef();

  const [closing, setClosing] = useState(false);
  const { isOpen } = useSelector(selectFavorites);
  const { tempUnits } = useSelector(selectAllMeasures);

  const handleClick = (e) => {
    if (!removeBtnRef.current.contains(e.target)) {
      dispatch(loadWeatherById(id));
      dispatch(toggleFavorites(!isOpen));
    }
  };

  const handleRemove = () => {
    setClosing(true);
    timeRef.current = setTimeout(() => {
      dispatch(removeFromFavorites(id));
      setClosing(false);
    }, 400);
  };

  return (
    <Wrapper
      onClick={handleClick}
      $closing={closing}
      $isOpen={isOpen}
      $index={index}
    >
      <RemoveFromFavoritesBtn ref={removeBtnRef} onClick={handleRemove}>
        <IoClose />
      </RemoveFromFavoritesBtn>
      <Time>{formatDate(dt, timezone, "HH:mm")}</Time>
      <City>{city}</City>
      <WeatherData>
        <TiWeatherPartlySunny />
        <Temp>{getTempStr(temp, tempUnits, false)}</Temp>
      </WeatherData>
    </Wrapper>
  );
};

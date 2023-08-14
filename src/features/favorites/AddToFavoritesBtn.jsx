import styled from "styled-components";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  loadFavorites,
  removeFromFavorites,
  selectFavorites,
} from "./favoritesSlice";
import { selectWeather } from "../weather/weatherSlice";
import { useState } from "react";

const Wrapper = styled.button`
  display: flex;
  font-size: 1.8rem;
  cursor: pointer;

  .star-outline {
    display: ${({ $isFavorite }) => ($isFavorite ? "none" : "block")};
  }

  .star-fill {
    display: ${({ $isFavorite }) => ($isFavorite ? "block" : "none")};
    color: var(--clr-rose);
  }
`;

export const AddToFavoritesBtn = () => {
  const dispatch = useDispatch();
  const { favoritesIds } = useSelector(selectFavorites);
  const { currentData } = useSelector(selectWeather);

  const checkFavorite = () => {
    if (currentData) {
      const isFavorite = favoritesIds.find((item) => item === currentData.id);
      return isFavorite ? true : false;
    }
  };

  const handleClick = async () => {
    if (!checkFavorite()) {
      dispatch(addToFavorites(currentData.id));
      dispatch(loadFavorites([currentData.id, ...favoritesIds]));
    } else {
      dispatch(removeFromFavorites(currentData.id));
    }
  };

  return (
    <Wrapper onClick={handleClick} $isFavorite={checkFavorite()}>
      <AiOutlineStar className="star-outline" />
      <AiFillStar className="star-fill" />
    </Wrapper>
  );
};

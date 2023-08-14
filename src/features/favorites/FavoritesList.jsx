import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectFavorites } from "./favoritesSlice";

import { FavoritesListItem } from "./FavoritesListItem";

const Wrapper = styled.ul`
  padding: 2rem;
  min-height: calc(100vh - 4rem);
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
`;

export const FavoritesList = () => {
  const { favoritesData } = useSelector(selectFavorites);
  return (
    <Wrapper>
      {favoritesData.map((item, index) => (
        <FavoritesListItem
          key={item.currentData.id}
          index={index + 1}
          {...item.currentData}
        />
      ))}
    </Wrapper>
  );
};

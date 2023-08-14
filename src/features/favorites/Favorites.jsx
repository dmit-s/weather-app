import { IoIosArrowDropleft } from "react-icons/io";
import styled, { createGlobalStyle, css } from "styled-components";
import { FavoritesList } from "./FavoritesList";
import { useDispatch, useSelector } from "react-redux";
import { selectFavorites, toggleFavorites } from "./favoritesSlice";
import { useOutsideClick } from "../../utls/useOutsideClick";
import { FavoritesEmpty } from "./FavoritesEmpty";
import { SpinnerLoader } from "../../components/SpinnerLoader";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  max-width: 300px;
  min-height: 100vh;
  width: 75vw;
  background-color: var(--bg-secondary);
  box-shadow: 4px 0px 8px 0px rgba(0, 0, 0, 0.2);

  ${({ $isOpen }) => {
    switch ($isOpen) {
      case true:
        return css`
          transform: translateX(0);
          opacity: 1;
          visability: visible;
        `;
      case false:
        return css`
          transform: translateX(-200%);
          opacity: 0;
          visability: hidden;
        `;
    }
  }}
  transition: 500ms ease-out;
`;
const FavoritesHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 1rem 2rem;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: var(--bg-third);
  }
`;
const FavoritesTitle = styled.h3`
  font-size: 1.25rem;
`;
const CloseFavoritesBtn = styled.button`
  display: flex;
  font-size: 2.2rem;
  cursor: pointer;
  margin-right: 0.75rem;
  color: var(--secondary);
  transition: 0.4s;

  &:hover {
    color: var(--primary);
  }
`;

const GlobalStyle = createGlobalStyle`
  body{
    // scrollbar-gutter: stable;
    overflow: ${({ $isOpen }) => ($isOpen ? "hidden" : "auto")};
  }
`;

const FovoritesContent = styled.div``;

export const Favorites = () => {
  const dispatch = useDispatch();
  const { isOpen, status, favoritesData } = useSelector(selectFavorites);

  const handleClose = () => {
    dispatch(toggleFavorites(false));
  };

  const ref = useOutsideClick(handleClose);

  return (
    <>
      <GlobalStyle $isOpen={isOpen} />
      <Wrapper ref={ref} $isOpen={isOpen}>
        <FavoritesHeader>
          <CloseFavoritesBtn onClick={handleClose}>
            <IoIosArrowDropleft />
          </CloseFavoritesBtn>
          <FavoritesTitle>Favorites</FavoritesTitle>
        </FavoritesHeader>
        <FovoritesContent>
          {favoritesData &&
            favoritesData.length === 0 &&
            status === "received" && <FavoritesEmpty />}
          {status === "loading" && <SpinnerLoader />}
          {status === "received" && <FavoritesList />}
        </FovoritesContent>
      </Wrapper>
    </>
  );
};

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectFavorites, toggleFavorites } from "./favoritesSlice";

const Wrapper = styled.label`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 30px;
  width: 100%;
  height: 23px;
  cursor: pointer;
  margin-right: auto;

  @media (max-width: 1024px) {
    margin-right: 2rem;
  }

  @media (max-width: 481px) {
    max-width: 24px;
  }
`;
const Input = styled.input.attrs({
  type: "checkbox",
})`
  position: absolute;
  width: 100%;
  height: 100%;
  visibility: hidden;
  opacity: 0;
`;
const Line = styled.span`
  display: inline-block;
  width: ${({ $width }) => ($width ? $width : "100%")};
  height: 3px;
  background-color: var(--secondary);
`;

export const ShowFavoritesBtn = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector(selectFavorites);

  const handleChange = () => {
    dispatch(toggleFavorites(!isOpen));
  };

  return (
    <Wrapper>
      <Input onChange={handleChange} checked={isOpen} />
      <Line />
      <Line $width="80%" />
      <Line />
    </Wrapper>
  );
};

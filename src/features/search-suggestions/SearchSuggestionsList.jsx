import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { loadWeatherByCoords } from "../weather/weatherSlice";
import { useOutsideClick } from "../../utls/useOutsideClick";

const Wrapper = styled.ul`
  display: ${({ $showSuggest }) => ($showSuggest ? "block" : "none")};
  position: absolute;
  top: 100%;
  left: 0;
  padding: 0.25rem 0;
  width: calc(100% - 15px);
  transform: translateY(10px);
  background-color: var(--bg-primary);
  border-radius: 5px;
`;
const Item = styled.li`
  font-size: 0.9rem;
  padding: 0.5rem;

  cursor: pointer;

  &:hover {
    background-color: var(--hover-clr);
  }
`;

const BoldEl = styled.b`
  font-size: 1rem;
`;

export const SearchSuggestionsList = ({
  search,
  filteredSugg,
  showSuggest,
  closeSuggest,
}) => {
  const dispatch = useDispatch();

  const handleClick = (coords) => {
    dispatch(loadWeatherByCoords(coords));
    closeSuggest();
  };

  return (
    <>
      <Wrapper $showSuggest={showSuggest}>
        {filteredSugg.map((item) => {
          if (item.name.toLowerCase().startsWith(search.toLowerCase())) {
            return (
              <Item
                key={item.id}
                onClick={() => handleClick({ lat: item.lat, lon: item.lon })}
              >
                <BoldEl>{item.name.substr(0, search.length)}</BoldEl>
                {item.name.substr(search.length)} {item.region},{" "}
                {item.countryCode}
              </Item>
            );
          }
        })}
      </Wrapper>
    </>
  );
};

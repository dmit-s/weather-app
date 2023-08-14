import styled, { css, keyframes } from "styled-components";
import { IoSearch, IoSync } from "react-icons/io5";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { getCities } from "../api";
import { SearchSuggestionsList } from "../features/search-suggestions/SearchSuggestionsList";
import { useDispatch, useSelector } from "react-redux";
import {
  loadWeatherByCity,
  selectWeather,
} from "../features/weather/weatherSlice";
import { useOutsideClick } from "../utls/useOutsideClick";
import { useSearchParams } from "react-router-dom";
import { useSearchSuggestions } from "../features/search-suggestions/useSearchSuggestions";

// const rotate = keyframes`
// from {
//   transform: rotate(0);
// } to{
//   transform: rotate(360deg);
// }`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  max-width: 260px;
  height: 2.2rem;
  border-radius: 5px 15px 15px 5px;
`;
const SearchInput = styled.input`
  padding-left: 0.75rem;
  padding-right: 1.5rem;
  background-color: var(--bg-primary);
  color: var(--primary);
  font-size: 1.2rem;
  width: 100%;
  height: 100%;
  transition: 0.3s;

  border-radius: 5px 0 0 5px;

  &:focus {
    background-color: var(--hover-clr);
  }
`;
const ClearBtn = styled.button``;
const SearchBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-third);
  max-width: 3.25rem;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border-radius: 15px;
  cursor: pointer;
  transform: translateX(-15px);
  transition: .3s;


  &:hover{
    background-color: var(--bg-third-hover);
  }

  svg {
    color: var(--primary);
    font-size: 1.3rem;

    ${({ $loading }) =>
      $loading
        ? css`
            animation: ${rotate} 400ms infinite forwards;
            &:first-child {
              display: none;
            }
          `
        : css`
            &:last-child {
              display: none;
            }
          `}
`;
const ErrorMessage = styled.small`
  position: absolute;
  bottom: -5px;
  left: 5px;
  transform: translateY(100%);
  color: var(--clr-error);
  font-size: 1rem;
`;

export const SearchForm = () => {
  const dispatch = useDispatch();

  const { error } = useSelector(selectWeather);

  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [loading, setLoading] = useState(false);

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggest, setShowSuggest] = useState(false);

  const filteredSugg = useSearchSuggestions(search, suggestions);

  const timerRef = useRef(null);

  useEffect(() => {
    if (search.length) {
      timerRef.current = setTimeout(() => {
        setLoading(true);

        const searchTerm = search.toLowerCase().trim();

        getCities(searchTerm)
          .then((data) => {
            setShowSuggest(true);

            const suggestionsData = data
              .map((item) => ({
                id: item.id,
                lat: item.latitude,
                lon: item.longitude,
                name: item.name,
                region: item.region,
                countryCode: item.countryCode,
              }))
              .filter((item) =>
                item.name.toLowerCase().startsWith(search.toLowerCase())
              );
            setSuggestions(suggestionsData);
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
      }, 1000);

      // Search Params
      setSearchParams({ q: search });
    } else {
      setSuggestions([]);
      // Search Params
      searchParams.delete("q");
      setSearchParams(searchParams);
    }

    return () => timerRef.current && clearTimeout(timerRef.current);
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loadWeatherByCity(search));

    closeSuggest();
    timerRef.current && clearTimeout(timerRef.current);
  };

  const closeSuggest = () => {
    setShowSuggest(false);
  };

  const ref = useOutsideClick(closeSuggest);

  return (
    <Wrapper ref={ref} onSubmit={handleSubmit}>
      <SearchInput
        onFocus={() => setShowSuggest(true)}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />

      <SearchBtn $loading={loading}>
        <IoSearch />
        <IoSync />
      </SearchBtn>
      <ClearBtn></ClearBtn>

      {error && (
        <ErrorMessage>
          {error.charAt(0).toUpperCase() + error.slice(1)}
        </ErrorMessage>
      )}

      {Boolean(filteredSugg.length) && (
        <SearchSuggestionsList
          showSuggest={showSuggest}
          closeSuggest={closeSuggest}
          search={search}
          filteredSugg={filteredSugg}
        />
      )}
    </Wrapper>
  );
};

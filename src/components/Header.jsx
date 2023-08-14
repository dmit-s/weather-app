import styled from "styled-components";
import { CurrentPositionBtn } from "../features/geolocation/CurrentPositionBtn";
import { ShowFavoritesBtn } from "../features/favorites/ShowFavoritesBtn";
import { SearchForm } from "./SearchForm";
import { Settings } from "./Settings";
import { Favorites } from "../features/favorites/Favorites";
import { ShowSettingsBtn } from "./ShowSettingsBtn";
import { useState } from "react";
import { AddToFavoritesBtn } from "../features/favorites/AddToFavoritesBtn";

const Wrapper = styled.header`
  padding: 2rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 481px) {
    padding: 2rem 1rem;
  }
`;
const EnterLocation = styled.div`
  display: flex;
  align-items: center;
`;

export const Header = () => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <Wrapper>
      <ShowFavoritesBtn />
      <Favorites />

      <EnterLocation>
        <SearchForm />
        <CurrentPositionBtn />
        <AddToFavoritesBtn />
      </EnterLocation>

      <ShowSettingsBtn
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />
      <Settings showSettings={showSettings} setShowSettings={setShowSettings} />
    </Wrapper>
  );
};

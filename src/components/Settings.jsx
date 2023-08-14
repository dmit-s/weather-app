import styled, { css } from "styled-components";
import { MeasureSettings } from "../features/measures/MeasureSettings";
import { ThemeSwitcher } from "../features/theme/ThemeSwitcher";
import { IoClose } from "react-icons/io5";
import { useOutsideClick } from "../utls/useOutsideClick";

const Wrapper = styled.div`
  display: flex;
  margin-left: 3rem;

  @media (max-width: 1024px) {
    position: fixed;
    top: 0;
    right: 0;
    flex-direction: column;
    align-items: center;
    background-color: var(--bg-secondary);
    border-radius: 5px;
    padding: 1rem 2rem;
    box-shadow: 4px 0px 8px 0px rgba(0, 0, 0, 0.2);

    ${({ $show }) => {
      switch ($show) {
        case true:
          return css`
            opacity: 1;
            visibility: visible;
            transform: translateX(0);
          `;
        case false:
          return css`
            opacity: 0;
            visibility: hidden;
            transform: translateX(200%);
          `;
      }
    }};

    overflow: hidden;
    transition: 0.5s;
  }
`;

const CloseSettingsBtn = styled.button`
  display: none;
  font-size: 2rem;
  cursor: pointer;

  @media (max-width: 1024px) {
    display: block;
  }
`;

export const Settings = ({ showSettings, setShowSettings }) => {
  const handleClose = () => {
    setShowSettings(false);
  };

  const ref = useOutsideClick(handleClose);
  return (
    <Wrapper ref={ref} $show={showSettings}>
      <CloseSettingsBtn onClick={handleClose}>
        <IoClose />
      </CloseSettingsBtn>
      <MeasureSettings />

      <ThemeSwitcher />
    </Wrapper>
  );
};

import { IoSettings } from "react-icons/io5";
import styled from "styled-components";

const Wrapper = styled.button`
  display: none;
  margin-left: 2rem;
  font-size: 1.8rem;
  cursor: pointer;

  @media (max-width: 1024px) {
    display: flex;
  }
`;

export const ShowSettingsBtn = ({ showSettings, setShowSettings }) => {
  const handleClick = () => {
    setShowSettings(!showSettings);
  };

  return (
    <Wrapper onClick={handleClick}>
      <IoSettings />
    </Wrapper>
  );
};

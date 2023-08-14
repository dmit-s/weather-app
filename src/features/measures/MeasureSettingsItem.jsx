import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectAllMeasures } from "./measuresSlice";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: var(--bg-primary);
  border-radius: 10px;
  overflow: hidden;
  min-width: 120px;
  transition: 0.3s;

  &:hover {
    background-color: var(--hover-clr);
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: var(--bg-active);
    border-radius: 10px;
    transform: ${({ $units }) =>
      $units === "imperial" ? "translateX(100%)" : "translateX(0)"};
    transition: 0.5s;
  }

  &:not(:last-child) {
    margin-right: 1rem;

    @media (max-width: 1024px) {
      margin: 0;
      margin-bottom: 1rem;
    }
  }
`;
const Btn = styled.button`
  position: relative;
  z-index: 1;
  padding: 0.4rem 0;
  font-size: 1.1rem;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border-radius: 10px;
`;

export const MeasureSettingsItem = ({
  firstValue,
  secondValue,
  handleClick,
  units,
}) => {
  return (
    <Wrapper $units={units}>
      <Btn onClick={() => handleClick("metric")}>{firstValue}</Btn>
      <Btn onClick={() => handleClick("imperial")}>{secondValue}</Btn>
    </Wrapper>
  );
};

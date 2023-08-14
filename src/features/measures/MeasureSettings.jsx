import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { MeasureSettingsItem } from "./MeasureSettingsItem";
import {
  changeTempMeasure,
  changeWindMeasure,
  selectAllMeasures,
} from "./measuresSlice";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  margin-right: 3rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    margin: 0;
    margin-bottom: 1rem;
  }
`;

export const MeasureSettings = () => {
  const dispatch = useDispatch();
  const { tempUnits, windSpeedUnits } = useSelector(selectAllMeasures);

  const items = [
    {
      id: crypto.randomUUID(),
      firstValue: "°C",
      secondValue: "°F",
      handleClick: (x) => dispatch(changeTempMeasure(x)),
      units: tempUnits,
    },
    {
      id: crypto.randomUUID(),
      firstValue: "m/s",
      secondValue: "m/h",
      handleClick: (x) => dispatch(changeWindMeasure(x)),
      units: windSpeedUnits,
    },
  ];

  return (
    <Wrapper>
      {items.map((item) => (
        <MeasureSettingsItem key={item.id} {...item} />
      ))}
    </Wrapper>
  );
};

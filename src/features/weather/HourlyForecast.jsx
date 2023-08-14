import { useSelector } from "react-redux";
import styled from "styled-components";

import { HourlyForecastList } from "./HourlyForecastList";
import { selectWeather } from "./weatherSlice";

const Wrapper = styled.section`
  grid-column: 8 / -1;
  cursor: grab;
  margin: auto 0;

  @media (max-width: 768px) {
    margin: 0;
    padding: 2rem 0;
  }
`;
const Title = styled.h3`
  display: none;
  font-size: 1.8rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    display: inline-block;
  }
`;

export const HourlyForecast = () => {
  const { hoursData, daysData, status, error } = useSelector(selectWeather);

  return (
    <>
      <Wrapper>
        <Title>Hourly Forecast</Title>
        <HourlyForecastList />
      </Wrapper>
    </>
  );
};

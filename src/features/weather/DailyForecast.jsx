import { useSelector } from "react-redux";
import styled from "styled-components";

import { DailyForecastList } from "./DailyForecastList";
import { selectWeather } from "./weatherSlice";

const Wrapper = styled.section`
  position: relative;
  padding: 1rem 0 3rem;
  grid-row: 2 / 2;
  grid-column: 1 / -1;
`;
const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 2rem;
`;

export const DailyForecast = () => {
  const { status, error, daysData } = useSelector(selectWeather);
  return (
    <>
      <Wrapper>
        <Title>Daily Forecast</Title>
        <DailyForecastList />
      </Wrapper>
    </>
  );
};

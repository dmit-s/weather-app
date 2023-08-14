import styled from "styled-components";
import { Container } from "./Container";
import { CurrentWeather } from "../features/weather/CurrentWeather";
import { DailyForecast } from "../features/weather/DailyForecast";
import { HourlyForecast } from "../features/weather/HourlyForecast";
import { useSelector } from "react-redux";
import { selectWeather } from "../features/weather/weatherSlice";
import { SpinnerLoader } from "./SpinnerLoader";

const Wrapper = styled.main``;

const MainContainer = styled(Container)`
  display: grid;
  gap: 4rem;
  grid-template-columns: repeat(12, 1fr);

  @media (max-width: 768px) {
    display: block;
  }
`;

export const Main = () => {
  const { status, currentData } = useSelector(selectWeather);

  return (
    <Wrapper>
      <MainContainer>
        {status === "loading" && <SpinnerLoader />}
        {currentData && (status === "received" || status === "rejected") && (
          <>
            <CurrentWeather />
            <HourlyForecast />
            <DailyForecast />
          </>
        )}
      </MainContainer>
    </Wrapper>
  );
};

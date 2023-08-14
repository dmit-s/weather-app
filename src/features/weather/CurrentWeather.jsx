import styled from "styled-components";
import { selectWeather } from "./weatherSlice";
import { useSelector } from "react-redux";
import { selectAllMeasures } from "../measures/measuresSlice";
import { WeatherIcon } from "../../components/WeatherIcon";
import { getTempStr } from "../../utls/getTempStr";
import { getWindSpeedStr } from "../../utls/getWindSpeedStr";
import { formatDate } from "../../utls/formatDate";

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4rem 0;
  grid-column: 7 span;
  max-width: 550px;

  @media (max-width: 481px) {
    padding: 2rem 0;
  }
`;

const Content = styled.div``;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    width: 18rem;

    @media (max-width: 481px) {
      width: 15rem;
    }

    @media (max-width: 400px) {
      width: 12rem;
    }
  }
`;

const Desc = styled.span`
  text-align: center;

  @media (max-width: 481px) {
    max-width: 100px;
  }
`;

const DateInfo = styled.p`
  font-size: 1.2rem;

  @media (max-width: 481px) {
    font-size: 1.1rem;
  }
  @media (max-width: 380px) {
    font-size: 1rem;
  }
`;

const LocationInfo = styled.div`
  margin: 2.5rem 0;
  word-break: break-all;

  @media (max-width: 481px) {
    margin: 1.75rem 0;
  }
`;
const Title = styled.h3`
  font-size: 2rem;
  margin-bottom: 0.5rem;

  @media (max-width: 481px) {
    font-size: 1.7rem;
  }
  @media (max-width: 380px) {
    font-size: 1.4rem;
  }
`;
const Subtitle = styled.span`
  font-size: 1.2rem;

  @media (max-width: 481px) {
    font-size: 1rem;
  }
`;

const WeatherInfo = styled.div``;
const TempValue = styled.h2`
  font-size: 2.8rem;
  margin-bottom: 1rem;

  @media (max-width: 481px) {
    font-size: 1.8rem;
  }
`;

const List = styled.ul``;
const ListItem = styled.li`
  font-weight: 600;
  font-size: 1.2rem;

  @media (max-width: 481px) {
    font-size: 1.1rem;
  }

  &:not(:last-child) {
    margin-bottom: 0.25rem;
  }
`;
const ListItemSpan = styled.span`
  font-weight: 400;
  padding-left: 0.5rem;
`;

export const CurrentWeather = () => {
  const { currentData } = useSelector(selectWeather);
  const { tempUnits, windSpeedUnits } = useSelector(selectAllMeasures);

  return (
    <Wrapper>
      <Content>
        <DateInfo>
          {formatDate(
            currentData.dt_txt ?? currentData.dt,
            currentData.timezone,
            "dddd	D MMMM"
          )}
        </DateInfo>
        <LocationInfo>
          <Title>{currentData.city}</Title>
          <Subtitle>{currentData.country}</Subtitle>
        </LocationInfo>
        <WeatherInfo>
          <TempValue>{getTempStr(currentData.temp, tempUnits, true)}</TempValue>
          <List>
            <ListItem>
              Wind:{" "}
              <ListItemSpan>
                {getWindSpeedStr(currentData.windSpeed, windSpeedUnits)}
              </ListItemSpan>
            </ListItem>
            <ListItem>
              Humidity: <ListItemSpan>{currentData.humidity} %</ListItemSpan>
            </ListItem>
          </List>
        </WeatherInfo>
      </Content>
      <IconContainer>
        <WeatherIcon icon={currentData.icon} />
        <Desc>{currentData.desc}</Desc>
      </IconContainer>
    </Wrapper>
  );
};

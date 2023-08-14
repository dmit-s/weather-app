import styled from "styled-components";
import { WeatherIcon } from "../../components/WeatherIcon";
import { useDispatch, useSelector } from "react-redux";
import { printInfoByDay } from "./weatherSlice";
import { selectAllMeasures } from "../measures/measuresSlice";
import { getTempStr } from "../../utls/getTempStr";
import { formatDate } from "../../utls/formatDate";

const Wrapper = styled.div`
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--bg-primary);
  border-radius: 10px;
  transition: 0.3s;
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      box-shadow: var(--hover-shadow-clr);
    }
  }

  @media (max-width: 481px) {
    padding: 1rem 1.5rem;
  }

  svg {
    margin: 1rem 0;
    width: 90px;
    height: 90px;
    font-size: 5rem;

    @media (max-width: 481px) {
      width: 70px;
      height: 70px;
      margin: 0.5rem 0;
    }
  }
`;

const TimeInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimeInfoSpan = styled.span`
  color: var(--secondary);
  font-size: 1.2rem;
`;
const TempInfo = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;
export const DailyForecastItem = (props) => {
  const {
    index,
    id,
    city,
    country,
    dt,
    dt_txt,
    timezone,
    temp,
    desc,
    windSpeed,
    humidity,
    icon,
  } = props;
  const dispatch = useDispatch();
  const { tempUnits } = useSelector(selectAllMeasures);

  const handleClick = () => {
    const data = {
      id,
      city,
      country,
      dt,
      dt_txt,
      timezone,
      temp,
      desc,
      windSpeed,
      humidity,
      icon,
    };

    dispatch(printInfoByDay({ data, index }));
  };

  const getDayWeek = () => {
    switch (index) {
      case 0:
        return `Today ${formatDate(dt_txt, null, "h a")}`;
      case 1:
        return `Tomorrow ${formatDate(dt_txt, null, "h a")}`;
      default:
        return formatDate(dt_txt, null, "dddd	h a");
    }
  };

  return (
    <Wrapper onClick={handleClick}>
      <TimeInfo>
        <TimeInfoSpan>{formatDate(dt_txt, null, "D MMMM")}</TimeInfoSpan>
        <TimeInfoSpan>{getDayWeek()}</TimeInfoSpan>
      </TimeInfo>
      <WeatherIcon icon={icon} />
      <TempInfo>{getTempStr(temp, tempUnits)}</TempInfo>
    </Wrapper>
  );
};

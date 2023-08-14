import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectAllMeasures } from "../measures/measuresSlice";
import { getTempStr } from "../../utls/getTempStr";
import { WeatherIcon } from "../../components/WeatherIcon";
import { formatDate } from "../../utls/formatDate";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    max-width: 50px;
    max-height: 50px;
    min-width: 50px;
    min-height: 50px;
    font-size: 3rem;
    margin: 0.5rem 0;
  }
`;

const Time = styled.span`
  text-align: center;
  font-size: 1.1rem;
`;
const Temp = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
`;

export const HourlyForecastItem = (props) => {
  const { temp, icon, timezone, dt, dt_txt } = props;
  const { tempUnits } = useSelector(selectAllMeasures);

  return (
    <Wrapper>
      <Time>{formatDate(dt_txt, null, "h A")}</Time>
      <WeatherIcon icon={icon} />
      <Temp>{getTempStr(temp, tempUnits)}</Temp>
    </Wrapper>
  );
};

import { findIconName } from "../utls/findIconName";
import { useDynamicSvgImport } from "../utls/useDynamicSvgImport";
export const WeatherIcon = ({ icon }) => {
  const { loading, SvgIcon } = useDynamicSvgImport(findIconName(icon));
  return <>{!loading && <SvgIcon />}</>;
};

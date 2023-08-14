import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectWeather } from "./weatherSlice";
import { HourlyForecastItem } from "./HourlyForecastItem";
import { Swiper, SwiperSlide } from "swiper/react";

const Carousel = styled.div`
  overflow: hidden;
  background-color: var(--bg-primary);
  border-radius: 10px;

  .swiper {
    padding: 2rem 1rem;
    .swiper-wrapper {
      display: flex;
      align-items: center;
      height: 100%;

      .swiper-slide {
        flex: 0 0 80px;
      }
    }
  }
`;

export const HourlyForecastList = () => {
  const { hoursData } = useSelector(selectWeather);

  return (
    <Carousel>
      <Swiper grabCursor={true} slidesPerView={"auto"}>
        {hoursData.forecastHours[hoursData.activeIndex].map((item, index) => (
          <SwiperSlide key={index}>
            <HourlyForecastItem key={index} {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Carousel>
  );
};

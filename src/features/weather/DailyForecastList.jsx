import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectWeather } from "./weatherSlice";
import { DailyForecastItem } from "./DailyForecastItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Carousel = styled.div`
  overflow: hidden;

  .swiper {
    padding: 1rem;
  }

  .swiper-wrapper {
    display: flex;

    .swiper-slide {
      flex: 0 0 260px;

      @media (max-width: 481px) {
        flex: 0 0 220px;
      }

      &:not(:last-child) {
        margin-right: 1rem;
      }
    }
  }
`;

export const DailyForecastList = () => {
  const { daysData } = useSelector(selectWeather);

  return (
    <>
      <Carousel>
        <Swiper grabCursor={true} slidesPerView={"auto"}>
          {daysData.map((item, index) => (
            <SwiperSlide key={index}>
              <DailyForecastItem key={index} {...item} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Carousel>
    </>
  );
};

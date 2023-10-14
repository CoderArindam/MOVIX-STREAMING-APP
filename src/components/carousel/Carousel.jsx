import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";

import "./Carousel.scss";
import dayjs from "dayjs";
import CircleRating from "../circleRating/circleRating";
import Genres from "../genres/Genres";

const Carousel = ({ data, loading, endpoint, title}) => {
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const showSkeleton = () => {
    return (
      <div className="skeletonItem">
        <div className="carousel__posterBlock skeleton"></div>
        <div className="text__block">
          <div className="text__title skeleton"></div>
          <div className="text__date skeleton"></div>
        </div>
      </div>
    );
  };
  const navigation = (direction) => {
    const container = carouselContainer.current;
  
    const scrollAmount =
      direction === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);
  
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };
  
  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carousel__title">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carousel__leftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carousel__rightNav arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="carousel__items" ref={carouselContainer}>
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;
              return (
                <div key={item.id} className="carousel__item" onClick={()=>navigate(`/${item.media_type || endpoint}/${item.id}`)}>
                  <div className="carousel__posterBlock">
                    <Img src={posterUrl} />
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                    <Genres data={item.genre_ids.slice(0, 2)} />
                  </div>
                  <div className={`text__block ${loading ? "skeleton" : ""}`}>
                    <span
                      className={`text__title ${loading ? "skeleton" : ""}`}
                    >
                      {item.title || item.name}
                    </span>
                    <span className={`text__date ${loading ? "skeleton" : ""}`}>
                      {dayjs(item.release_date).format("MMM D, YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {showSkeleton()}
            {showSkeleton()}
            {showSkeleton()}
            {showSkeleton()}
            {showSkeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;

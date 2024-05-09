import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import CircleRating from "../CircleRating/CircleRating";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import Genres from "../Genres/Genres";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import Img from "../../components/lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import "./Carousel.scss";
const Carousel = ({ data, loading, endpoint, title }) => {
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const navigation = (dir) => {
    const container = carouselContainer.current;
    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };
  const makeSkeleton = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton">
          <div className="textBlock">
            <span className="title skeleton"></span>
            <span className="date skeleton"></span>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => {
            navigation("left");
          }}
        ></BsFillArrowLeftCircleFill>
        <BsFillArrowRightCircleFill
          className="carouselRightNav arrow"
          onClick={() => {
            navigation("right");
          }}
        ></BsFillArrowRightCircleFill>
        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.map((item) => {
              const pathImage = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;
              return (
                <div
                  key={item.id}
                  className="carouselItem"
                  onClick={() => {
                    navigate(`/${item.media_type || endpoint}/${item.id}`);
                  }}
                >
                  <div className="posterBlock">
                    <Img src={pathImage}></Img>
                    <CircleRating
                      rating={item.vote_average.toFixed(1)}
                    ></CircleRating>
                    <Genres data={item.genre_ids.slice(0, 2)}></Genres>
                  </div>
                  <div className="textBlock">
                    <span className="title">
                      {/* for movies we have titles but for tv shows we have names */}
                      {item.title || item.name}
                    </span>
                    <span className="date">
                      {item.release_date
                        ? dayjs(item.release_date).format("MMM D,YYYY")
                        : "N/A"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {makeSkeleton()}
            {makeSkeleton()}
            {makeSkeleton()}
            {makeSkeleton()}
            {makeSkeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;

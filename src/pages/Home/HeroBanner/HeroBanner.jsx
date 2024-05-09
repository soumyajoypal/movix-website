import React, { useEffect, useState } from "react";
import "./HeroBanner.scss";
import useFetch from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";

const HeroBanner = () => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [bgImage, setBgImage] = useState("");
  const { data, loading } = useFetch("/movie/upcoming");
  useEffect(() => {
    // conditional operator very imp since data may be undefined so we can get error
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBgImage(bg);
  }, [data]);
  const handleSearch = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={bgImage}></Img>
        </div>
      )}
      {/* to give a layer to the herobanner using css(to make it look better) */}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subTitle">
            Millions of Movies,TV Shows and people to discover.Explore Now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or tv show..."
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              onKeyDown={handleSearch}
            />
            <button
              onClick={() => {
                if (query.length >= 1) {
                  navigate(`/search/${query}`);
                }
              }}
            >
              Search
            </button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;

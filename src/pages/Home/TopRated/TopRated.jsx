import React, { useState } from "react";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";

import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/Carousel/Carousel";
const Trending = () => {
  const [endpoint, setEndpoint] = useState("movie");
  const { data, loading } = useFetch(`/${endpoint}/top_rated`);
  const handleTab = (tab) => {
    const choice = tab === "Movies" ? "movie" : "tv";
    setEndpoint(choice);
  };
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Top Rated</span>
        <SwitchTabs
          data={["Movies", "TV Shows"]}
          handleTab={handleTab}
        ></SwitchTabs>
      </ContentWrapper>
      <Carousel
        data={data?.results}
        loading={loading}
        endpoint={endpoint}
      ></Carousel>
    </div>
  );
};

export default Trending;

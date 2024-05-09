import React, { useState } from "react";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";

import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/Carousel/Carousel";
const Trending = () => {
  const [endpoint, setEndpoint] = useState("day");
  const { data, loading } = useFetch(`/trending/all/${endpoint}`);
  const handleTab = (tab) => {
    setEndpoint(tab.toLowerCase());
  };
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs data={["Day", "Week"]} handleTab={handleTab}></SwitchTabs>
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading}></Carousel>
    </div>
  );
};

export default Trending;

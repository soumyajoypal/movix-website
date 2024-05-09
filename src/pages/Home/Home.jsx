import React from "react";
import "./Home.scss";
import HeroBanner from "./HeroBanner/HeroBanner";
import Trending from "./Trending/Trending";
import Popular from "./Popular/Popular";
import TopRated from "./TopRated/TopRated";
const Home = () => {
  return (
    <div className="homePage">
      <HeroBanner></HeroBanner>
      <Trending></Trending>
      <Popular></Popular>
      <TopRated></TopRated>
    </div>
  );
};

export default Home;

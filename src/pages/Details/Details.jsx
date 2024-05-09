import React from "react";
import "./Details.scss";
import DetailsBanner from "./DetailsBanner/DetailsBanner";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Cast from "./Cast/Cast";
import VideosSection from "./VideosSection/VideosSection";
import Similar from "./carousels/Similar";
import Recommended from "./carousels/Recommended";
const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  return (
    <div>
      <DetailsBanner
        video={data?.results[0]}
        crew={credits?.crew}
      ></DetailsBanner>
      <Cast data={credits?.cast} loading={creditsLoading}></Cast>
      <VideosSection data={data} loading={loading}></VideosSection>
      <Similar mediaType={mediaType} id={id}></Similar>
      <Recommended mediaType={mediaType} id={id}></Recommended>
    </div>
  );
};

export default Details;

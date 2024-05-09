import React from "react";
import Carousel from "../../../components/Carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Similar = ({ mediaType, id }) => {
  const { data, loading } = useFetch(`/${mediaType}/${id}/similar`);
  const title = mediaType === "tv" ? "Similar Tv Shows" : "Similar Movies";
  return (
    <Carousel
      title={title}
      loading={loading}
      data={data?.results}
      endpoint={mediaType}
    ></Carousel>
  );
};

export default Similar;

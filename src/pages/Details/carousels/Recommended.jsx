import React from "react";
import Carousel from "../../../components/Carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Recommended = ({ mediaType, id }) => {
  const { data, loading } = useFetch(`/${mediaType}/${id}/recommendations`);
  return (
    <Carousel
      title="Recommendations"
      loading={loading}
      data={data?.results}
      endpoint={mediaType}
    ></Carousel>
  );
};

export default Recommended;

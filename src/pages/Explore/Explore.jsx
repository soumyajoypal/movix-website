import React, { useEffect, useState } from "react";
import Select from "react-select";
import useFetch from "../../hooks/useFetch";
import "./Explore.scss";
import { useParams } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import { fetchData } from "../../utils/api";
import Spinner from "../../components/Spinner/Spinner";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import InfiniteScroll from "react-infinite-scroll-component";
const sortOptions = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState("");
  const [sortBy, setSortBy] = useState("");
  // initially we load page 1
  const [page, setPage] = useState(1);
  const { mediaType } = useParams();
  let filters = {}; //this will be the filter params in our main api call as the api is designed in this way

  // we need to also make a list of genres for our select option
  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

  // initial data loading
  const fetchInitialData = async () => {
    setLoading(true);
    try {
      fetchData(`/discover/${mediaType}`, filters).then((res) => {
        setData(res);
        // we want to store the next page in buffer for the inifnite scroll component
        setPage((prev) => prev + 1);
        setLoading(false);
      });
    } catch (error) {
      setData(null);
      setLoading(false);
    }
  };
  // imp code(very importantt logic)
  const fetchNextPage = async () => {
    try {
      fetchData(`/discover/${mediaType}`, filters).then((res) => {
        // now we need to merge the two pages data together if we had a prev data
        if (data?.results) {
          setData({ ...data, results: [...data?.results, ...res?.results] });
        } else {
          setData(res);
        }
        setPage((prev) => prev + 1);
        setLoading(false);
      });
    } catch (error) {
      setData(null);
    }
  };
  useEffect(() => {
    // whenever we change the mediaType it should go back to initial stages
    filters = {};
    setData(null);
    setPage(1);
    setLoading(true);
    setGenre("");
    setSortBy("");
    fetchInitialData();
  }, [mediaType]);
  const onChange = (selectedOptions, action) => {
    console.log("yes");
    if (action.name == "genre") {
      setGenre(selectedOptions);
      if (action.action !== "clear") {
        // we have id as values for the genres using this ids we can get genre info so we need to pass the ids of genres we want to filter as a string
        let idMap = selectedOptions.map((item) => item.id);
        idMap = JSON.stringify(idMap).slice(1, -1); //removing the brackets from the string
        filters.with_genres = idMap;
      } else {
        delete filters.with_genres;
      }
    }
    if (action.name == "sortby") {
      setSortBy(selectedOptions);
      // now we want to make this changes to the filter param(and we select only 1 thing in sort by)
      if (action.action !== "clear") {
        filters.sort_by = selectedOptions.value;
      } else {
        delete filters.sort_by;
      }
    }
    //we want to have page 1 of the changed data
    setPage(1);
    fetchInitialData();
  };
  return (
    <div className="explorePage">
      <ContentWrapper>
        <div className="pageHeader">
          <div className="pageTitle">
            Explore {mediaType === "tv" ? "TV Shows" : "Movies"}
          </div>

          <div className="filters">
            <Select
              isMulti
              name="genre"
              options={genresData?.genres}
              getOptionLabel={(option) => option?.name}
              getOptionValue={(option) => option?.id}
              onChange={onChange}
              value={genre}
              placeholder="Select Genre"
              className="react-select-container genresDD"
              closeMenuOnSelect={false}
              classNamePrefix="react-select"
            ></Select>
            <Select
              options={sortOptions}
              value={sortBy}
              placeholder="Sort movies by"
              name="sortby"
              isClearable={true}
              className="react-select-container sortbyDD"
              onChange={onChange}
              classNamePrefix="react-select"
            ></Select>
          </div>
        </div>
        {loading && <Spinner initial={true}></Spinner>}
        {!loading && (
          <>
            {data?.results?.length > 0 ? (
              <InfiniteScroll
                dataLength={data?.results?.length || []}
                className="content"
                next={fetchNextPage}
                loader={<Spinner></Spinner>}
                hasMore={page <= data?.total_pages}
              >
                {data?.results?.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard
                      key={index}
                      data={item}
                      mediaType={mediaType}
                    ></MovieCard>
                  );
                })}
              </InfiniteScroll>
            ) : (
              <span className="resultNotFound">Sorry,Results not found</span>
            )}
          </>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Explore;

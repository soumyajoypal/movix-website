import React, { useEffect, useState } from "react";
import "./SearchResult.scss";
// Learn about this infinite scroll component very important and also learn its basic implementation
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchData } from "../../utils/api";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import noResults from "../../assets/no-results.png";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import MovieCard from "../../components/MovieCard/MovieCard";
const SearchResult = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  // this state is for making infinite scroll available for the search results page because by default we only get 20 items at a time so we want to add more items as we scroll down(IMPPPP logic very unique one (not done before))
  const [page, setPage] = useState(1);
  const { query } = useParams();
  const fetchInitialData = () => {
    setLoading(true);
    fetchData(`/search/multi?query=${query}&page=${page}`).then((res) => {
      setData(res);
      setPage((prev) => prev + 1);
      setLoading(false);
    });
  };
  // function to get data of the next page(VERY IMP)
  const fetchNextPage = () => {
    fetchData(`/search/multi?query=${query}&page=${page}`).then((res) => {
      if (data?.results) {
        // making an immutable copy and merging the two datas together if already present(IMP done already this kind of things)
        setData({ ...data, results: [...data?.results, ...res.results] });
      } else {
        setData(res);
      }
      setPage((prev) => prev + 1);
    });
  };
  useEffect(() => {
    // make the page number return to 1 as we change the query(IMP(this small mistakes can crash your code))
    setPage(1);
    fetchInitialData();
  }, [query]);
  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true}></Spinner>}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">{`Search ${
                data?.total_results > 1 ? "results" : "result"
              } of ${query}`}</div>
              {/* learn about more in the official documentation of React Infinite Scroll(IMP CODE) */}
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPage}
                hasMore={page <= data?.total_pages}
                loader={<Spinner></Spinner>}
              >
                {data?.results?.map((item, index) => {
                  if (item?.media_type === "person") return;
                  return (
                    <MovieCard
                      key={index}
                      data={item}
                      fromSearch={true}
                    ></MovieCard>
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound"> Sorry,Results Not Found</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;

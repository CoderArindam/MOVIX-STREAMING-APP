import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import "./SearchResult.scss";
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import noResults from "../../assets/no-results.png";
import Spinner from "../../components/spinner/Spinner";
import MovieCard from "../../components/moviecard/MovieCard";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = async () => {
    setLoading(true);
    const response = await fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`);
    setData(response);
    setPageNum((prev) => prev + 1);
    setLoading(false);
  };

  const fetchNextPageData = async () => {
    setLoading(true);
    const response = await fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`);
    if (response.results) {
      // Combine the old results with the new results
      const updatedResults = data.results
        ? [...data.results, ...response.results]
        : response.results;

      setData({
        ...data,
        results: updatedResults,
      });
    }
    setPageNum((prev) => prev + 1);
    setLoading(false);
  };

  useEffect(() => {
    fetchInitialData();
  }, [query]);

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      <ContentWrapper>
        <div className="pageTitle">
          {`Search ${data ? (data.total_results > 1 ? "results" : "result") : "results"} of '${query}'`}
        </div>
        <InfiniteScroll
          className="content"
          dataLength={data ? data.results.length : 0}
          next={fetchNextPageData}
          hasMore={data ? (pageNum <= data.total_pages) : false}
          loader={<Spinner />}
        >
          {data ? (
            data.results.map((item, index) => {
              if (item.media_type === "person") return null; // Skip rendering persons
              return <MovieCard key={index} data={item} fromSearch={true} />;
            })
          ) : null}
        </InfiniteScroll>
    
      </ContentWrapper>
    </div>
  );
};

export default SearchResult;

import React, { useState, useEffect } from "react";
import "./HeroBanner.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;

    setBackground(bg);
  }, [data]);
  const searchQueryHandler = (event) => {
    if (
      (event.key === "Enter" || event.type === "click") &&
      query.trim().length > 0
    ) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      {!loading &&<div className="heroBanner__backdropImage">
        <Img src={background}/>
      </div>}
          <div className="opacityLayer">

          </div>
      <ContentWrapper>
        <div className="heroBanner__content">
          <span className="heroBanner__title">Welcome.</span>
          <span className="heroBanner__subTitle">
            Millions of movies, TV shows and people to discover. Explore Now
          </span>
          <div className="heroBanner__searchInput">
            <input
              type="text"
              placeholder="Search for Movie or Tv Show Here..."
              onChange={(event) => setQuery(event.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button onClick={searchQueryHandler}>Search</button>
          </div>
        </div>
      </ContentWrapper>
     
    </div>
  );
};

export default HeroBanner;

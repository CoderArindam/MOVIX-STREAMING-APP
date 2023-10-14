import React, { useState, useEffect } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";
import '../../../components/carousel/Carousel.scss';

const Upcoming = () => {
  const [endpointOne, setEndpointOne] = useState("movie");
  const [endpointTwo, setEndpointTwo] = useState ('upcoming');
  const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format

  const { data, loading } = useFetch(`/${endpointOne}/${endpointTwo}?primary_release_date.gte=${currentDate}`);

  const onTabChange = (tab) => {
    setEndpointOne(tab === 'Movies' ? 'movie' : 'tv');
    setEndpointTwo(tab === 'Movies' ? 'upcoming' : 'airing_today');
  };

  return (
    <div className="carousel__section">
      <ContentWrapper>
        <span className="carousel__title">
          {endpointOne === 'movie' ? (
            <p>Prepare for the Premiere</p>
          ) : (
            <p>Airing Today</p>
          )}
        </span>
        <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={endpointOne} />
    </div>
  );
};

export default Upcoming;

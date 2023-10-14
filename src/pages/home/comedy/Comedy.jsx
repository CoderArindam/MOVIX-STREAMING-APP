import React, { useState, useEffect } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";
import '../../../components/carousel/Carousel.scss';

const Comedy = () => {
  const [endpoint, setEndpoint] = useState('movie');
  const { data, loading } = useFetch(`/discover/${endpoint}?with_genres=35`);

  return (
    <div className="carousel__section">
      <ContentWrapper>
        <span className="carousel__title">Do Not Laugh Challenge</span>
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
    </div>
  );
};

export default Comedy;

import React from "react";
import "./Details.scss";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import DetailsBanner from "./detailsbanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosSection/VideosSection";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";
const Details = () => {
  const { mediaType, id } = useParams();

  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  const findTrailerVideo = () => {
    if (data && data?.results) {
      const trailer = data?.results.find((video) => video?.type === 'Trailer');
      console.log(data.results)
      return trailer ? trailer.key : null;
      
    }
    
    return null;
    
  };

  const trailerVideo = findTrailerVideo();

  return (
    <div>
      <DetailsBanner video={trailerVideo}  crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={data} loading={loading}/>
     <Similar mediaType={mediaType} id={id} />
     <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;

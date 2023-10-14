import React, { useRef, useState } from "react";

import "./VideosSection.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { PlayButton } from "../PlayButton";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Img from "../../../components/lazyLoadImage/Img";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
const VideosSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const videoContainer = useRef();
  const navigation = (direction) => {
    const container = videoContainer.current;

    const scrollAmount =
      direction === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };
  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <div className="videosSection">
      <ContentWrapper>
        <BsFillArrowLeftCircleFill
          className="videosSection__leftNav arrow"
          onClick={() => {
            navigation("left");
          }}
        />
        <BsFillArrowRightCircleFill
          className="videosSection__rightNav arrow"
          onClick={() => {
            navigation("right");
          }}
        />
        <div className="sectionHeading">Official Videos</div>
        {!loading ? (
          <div className="videos" ref={videoContainer}>
            {data?.results.map((video) => (
              <div
                className="videoItem"
                onClick={() => {
                  setVideoId(video.key);
                  setShow(true);
                }}
                key={video.id}
              >
                <div className="videoThumbnail">
                  <Img
                    src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                  />
                  <PlayButton />
                </div>
                <div className="videoTitle">
                  {video.name}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="videoSkeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </ContentWrapper>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideosSection;

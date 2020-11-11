import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const YoutubeThumbnail = ({ url }) => {
  let youtubeUrl = String(url).split("/");
  let youtubeSrc = "https://www.youtube.com/embed/" + youtubeUrl[3];
  return (
    <iframe
      width="300px"
      height="200px"
      src={youtubeSrc}
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  );
};

YoutubeThumbnail.propTypes = {
  url: PropTypes.string.isRequired,
};

export default YoutubeThumbnail;

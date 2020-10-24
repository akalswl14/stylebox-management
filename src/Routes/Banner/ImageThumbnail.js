import React from "react";
import styled from "styled-components";

const ImageBox = styled.img`
  height: 70px;
`;

const ImageThumbnail = ({ Key }) => {
  return (
    <ImageBox
      src={"https://appdata-stylebox.s3-ap-southeast-1.amazonaws.com/" + Key}
    />
  );
};

export default ImageThumbnail;

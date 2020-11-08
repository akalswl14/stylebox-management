import React from "react";
import styled from "styled-components";
import { S3_URL } from "../../AWS_IAM";

const ImageBox = styled.img`
  height: 70px;
`;

const ImageThumbnail = ({ Key }) => {
  return <ImageBox src={S3_URL + Key} />;
};

export default ImageThumbnail;

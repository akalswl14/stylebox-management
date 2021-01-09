import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { OpenPageIcon } from "./Icons";

const OpenPageButtonContainer = styled.button`
  border: none;
  padding: 0px;
  background-color: transparent;
  margin-left: 10px;
`;

const OpenPageButton = ({ func }) => (
  <OpenPageButtonContainer onClick={func}>
    <OpenPageIcon size={15} />
  </OpenPageButtonContainer>
);

OpenPageButton.propTypes = {
  func: PropTypes.func,
};

export default OpenPageButton;

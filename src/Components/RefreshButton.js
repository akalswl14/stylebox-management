import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { AscSortIcon, DescSortIcon, RefreshIcon, SortIcon } from "./Icons";

const RefreshButtonContainer = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  min-width: fit-content;
  margin: 0px 4px;
`;

const RefreshButton = ({ size, func }) => (
  <RefreshButtonContainer onClick={func}>
    <RefreshIcon size={size} />
  </RefreshButtonContainer>
);

RefreshButton.propTypes = {
  size: PropTypes.number,
  func: PropTypes.func,
};

export default RefreshButton;

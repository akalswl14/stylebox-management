import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { AscSortIcon, DescSortIcon, SortIcon } from "./Icons";

const SortButtonContainer = styled.button`
  border: none;
  padding: 0px;
  background-color: transparent;
  margin-left: 10px;
`;

const SortButton = ({ type, func }) => (
  <SortButtonContainer onClick={func}>
    {type === 0 ? (
      <SortIcon size={15} />
    ) : type === 1 ? (
      <AscSortIcon size={15} />
    ) : (
      <DescSortIcon size={15} />
    )}
  </SortButtonContainer>
);

SortButton.propTypes = {
  type: PropTypes.number.isRequired,
  func: PropTypes.func,
};

export default SortButton;
